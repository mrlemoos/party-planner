"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { getDatabase, ref as ref$, onValue, type DataSnapshot, get, set, child, update } from "firebase/database";
import { useRouter } from "next/navigation";

import type Party from "@root/models/Party";
import type Story from "@root/models/Story";
import type PartyMember from "@root/models/PartyMember";
import createFirebaseClient from "@root/repositories/_firebase-client/createFirebaseClient";
import convertFirebaseObjectToArray from "@root/util/covertFirebaseObjectToArray";

createFirebaseClient();

function transformSnapshotIntoPartyDataset(snapshot: DataSnapshot) {
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

export default function usePartyRealtime(partyId: string) {
  const [party, setParty] = useState<Party>(defaultValues);
  const [isFirstLoading, setFirstLoading] = useState(true);

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
    function resetVotes$(storyId: string) {
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
    },
    [party.stories, partyId]
  );

  const voteStory = useCallback(
    function resetVotes$(userId: string, storyId: string, vote: number) {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), "stories");

      const stories = party.stories.map(({ storyId: storyId$, votes, ...story }) => {
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

      setParty((party) => ({
        ...party,
        stories,
      }));
    },
    [party.stories, partyId]
  );
  const resetState = useCallback(function resetVotes$(party: Party) {
    setParty(party);
  }, []);

  const partyOwner = useMemo(
    () => party.members?.find(({ userId }) => userId === party.ownerUserId) ?? party.members?.[0],
    [party.members, party.ownerUserId]
  );

  useEffect(() => {
    const database = getDatabase();
    const ref = ref$(database, `parties/${partyId}`);

    function onSnapshot(snapshot: DataSnapshot) {
      if (!snapshot.exists()) {
        router.push("/404");
        return;
      }
      const party = transformSnapshotIntoPartyDataset(snapshot);

      console.log("🚨 Realtime watcher has got this registry:", party);

      if (!party) {
        return;
      }

      setParty(party);
    }

    (async () => {
      const snapshot = await get(ref);
      onSnapshot(snapshot);
      setFirstLoading(false);
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
  };
}
