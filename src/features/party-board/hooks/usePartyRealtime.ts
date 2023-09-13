"use client";

import { type ContextType, useCallback, useEffect, useMemo, useState } from "react";

import { getDatabase, ref as ref$, onValue, type DataSnapshot, get, set, child, update } from "firebase/database";
import { useRouter } from "next/navigation";

import convertFirebaseObjectToArray from "@root/util/covertFirebaseObjectToArray";
import createFirebaseClient from "@root/repositories/_firebase-client/createFirebaseClient";
import type Party from "@root/models/Party";
import type Story from "@root/models/Story";
import type PartyMember from "@root/models/PartyMember";

import PartyBoardContext from "../contexts/PartyBoardContext";

// We only invoke the Firebase and get the database instance once on the client
// side. This is because the Firebase client is not available on the server side
// as a singleton.This is why we need to create the Firebase client on the
// client side to update the party data in realtime on the client.
createFirebaseClient();

// #region Interfaces & Types

type VoteSession = Required<Pick<Party, "voteSession">>["voteSession"];
type VoteStatus = VoteSession["status"];
type PartyRealtime = NonNullable<ContextType<typeof PartyBoardContext>>;

// #endregion

/**
 * Transforms the {@link DataSnapshot} into a {@link Party} dataset given the
 * snapshot exists. Otherwise it returns `undefined`.
 */
function $transformSnapshotIntoPartyDataset(snapshot: DataSnapshot): Party | undefined {
  if (!snapshot.exists()) {
    return undefined;
  }
  const party = snapshot.toJSON() as Party;
  party.stories = party.stories ? (convertFirebaseObjectToArray(party.stories) as Story[]) : [];
  party.members = party.members ? (convertFirebaseObjectToArray(party.members) as PartyMember[]) : [];
  return party;
}

const defaultValues: Party = {
  partyId: "",
  ownerUserId: "",
  stories: [],
  members: [],
  createdAt: "",
  updatedAt: "",
};

// #endregion

/**
 * The custom hook that connects and updates the party data in realtime from the
 * database and provides the functions. This hook creates an instance of the
 * {@link useEffect} that the firebase realtime database and updates the party
 * data every time a new snapshot is received.
 *
 * It is important to note that this hook does not provide the party data
 * immediately, but only after the first snapshot is received. This means that
 * the party data will be a default object until the first snapshot is received.
 */
export default function usePartyRealtime(partyId: string): PartyRealtime {
  const [party, setParty] = useState<Party>(defaultValues);
  const router = useRouter();

  const addStory = useCallback(
    function addStory$(story: Story) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "stories");

      const stories = [...party.stories, story];

      set(ref, stories);

      setParty((party) => ({
        ...party,
        stories,
      }));
    },
    [partyId, party.stories]
  );

  const removeStory = useCallback(
    function removeStory$(storyId: string) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "stories");

      const stories = party.stories.filter(({ storyId: storyId$ }) => storyId$ !== storyId);

      set(ref, stories);

      setParty((party) => ({
        ...party,
        stories,
      }));
    },
    [partyId, party.stories]
  );

  const connectMember = useCallback(
    function connectMember$(member: PartyMember) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "members");

      const members = [...party.members, member];

      update(ref, members);

      setParty((party) => ({
        ...party,
        members,
      }));
    },
    [partyId, party.members]
  );

  const disconnectMember = useCallback(
    function disconnectMember$(memberId: string) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "members");

      const members = party.members.filter(({ userId }) => userId !== memberId);

      update(ref, members);

      setParty((party) => ({
        ...party,
        members,
      }));
    },
    [party.members, partyId]
  );

  const editStory = useCallback(
    function editStory$(storyId: string, partial: Partial<Story>) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "stories");

      const stories = party.stories.map(({ storyId: storyId$, ...story }) => {
        if (storyId === storyId$) {
          return {
            storyId,
            ...story,
            ...partial,
          };
        }
        return { storyId: storyId$, ...story };
      });

      set(ref, stories);

      setParty((party) => ({
        ...party,
        stories,
      }));
    },
    [party.stories, partyId]
  );

  const rewriteStories = useCallback(
    function rewriteStories$(stories: Story[]) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "stories");

      set(ref, stories);

      setParty((party) => ({
        ...party,
        stories,
      }));
    },
    [partyId]
  );

  const resetVotes = useCallback(
    function resetVotes$(storyId: string) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "stories");

      const stories = party.stories.map(({ storyId: storyId$, ...story }) => {
        if (storyId === storyId$) {
          return {
            storyId,
            ...story,
            votes: {},
          };
        }
        return { storyId: storyId$, ...story };
      });

      set(ref, stories);

      setParty((party) => ({
        ...party,
        stories,
      }));
    },
    [partyId, party.stories]
  );

  const revealStoryVotes = useCallback(
    function revealStoryVotes$(storyId: string) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "stories");

      const stories = party.stories.map(({ storyId: storyId$, ...story }) => {
        if (storyId === storyId$) {
          return {
            storyId,
            ...story,
            isRevealed: true,
          };
        }

        return { storyId: storyId$, ...story };
      });

      update(ref, stories);
    },
    [party.stories, partyId]
  );

  const voteStory = useCallback(
    function voteStory$(userId: string, storyId: string, vote: number) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "stories");

      const stories = party.stories.map(({ storyId: storyId$, votes = {}, ...story }) => {
        if (storyId === storyId$) {
          return {
            storyId,
            ...story,
            votes: {
              ...votes,
              [userId]: vote,
            },
          };
        }

        return { storyId: storyId$, votes, ...story };
      });

      set(ref, stories);

      setParty((previous) => ({
        ...previous,
        stories,
      }));
    },
    [party.stories, partyId]
  );

  const resetState = useCallback(
    function resetState$(party: Party) {
      const database = getDatabase();
      const ref = ref$(database, `parties/${partyId}`);

      set(ref, party);

      setParty(party);
    },
    [partyId]
  );

  const createVoteSession = useCallback(function createVoteSession$(
    partyId: string,
    storyId: string,
    voteStatus: VoteStatus
  ) {
    const database = getDatabase();
    const ref = child(ref$(database, `parties/${partyId}`), "voteSession");

    // 30 seconds by default for now
    const timer = 30 * 1000;
    const voteSession: VoteSession = {
      currentStoryId: storyId,
      status: voteStatus,
      timer,
    };

    set(ref, voteSession);

    setParty((previous) => ({
      ...previous,
      voteSession,
    }));
  },
  []);

  const updateVoteStatus = useCallback(
    function updateVoteSession$(partyId: string, voteStatus: VoteStatus) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "voteSession");

      const voteSession: VoteSession = {
        ...party?.voteSession!,
        status: voteStatus,
      };

      set(ref, voteSession);

      setParty((previous) => ({
        ...previous,
        voteSession,
      }));
    },
    [party.voteSession]
  );

  const tickTimer = useCallback(
    function tickTimer$(partyId: string, milliseconds: number) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "voteSession");

      const voteSession: VoteSession = {
        ...party?.voteSession!,
        timer: milliseconds,
      };

      set(ref, voteSession);
    },
    [party.voteSession]
  );

  const partyOwner = useMemo(
    () => party.members?.find(({ userId }) => userId === party.ownerUserId) ?? party.members?.[0],
    [party.members, party.ownerUserId]
  );

  const isCurrentUserPartyOwner = useMemo(
    () => partyOwner?.userId === party.ownerUserId,
    [partyOwner, party.ownerUserId]
  );

  useEffect(() => {
    const database = getDatabase();
    const ref = ref$(database, `parties/${partyId}`);

    /**
     * The event listener that is invoked every time a new snapshot is received
     * from the database. This function is also invoked once when the listener
     * is attached to the database.
     *
     * If the snapshot does not exist, then we redirect the user to the pathname
     * /404.
     */
    function onSnapshot(snapshot: DataSnapshot) {
      if (!snapshot.exists()) {
        router.push("/404");
        return;
      }
      const party = $transformSnapshotIntoPartyDataset(snapshot);

      console.log("🚨 Realtime watcher has got this registry:", party);

      if (!party) {
        return;
      }

      setParty(party);
    }

    (async () => {
      const snapshot = await get(ref);
      onSnapshot(snapshot);
    })();

    const unsubscribe = onValue(ref, onSnapshot);
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    ...party,
    addStory,
    removeStory,
    editStory,
    connectMember,
    disconnectMember,
    resetVotes,
    revealStoryVotes,
    voteStory,
    resetState,
    partyOwner,
    isCurrentUserPartyOwner,
    createVoteSession,
    updateVoteStatus,
    rewriteStories,
    tickTimer,
  };
}
