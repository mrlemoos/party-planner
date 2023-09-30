'use client';

import {
  type ContextType,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import {
  getDatabase,
  ref as ref$,
  onValue,
  type DataSnapshot,
  get,
  set,
  child,
  update,
} from 'firebase/database';
import { useRouter } from 'next/navigation';

import createFirebaseClient from '@root/repositories/_firebase-client/createFirebaseClient';
import transformSnapshotIntoPartyDataset from '@root/util/transformSnapshotIntoPartyDataset';
import useCurrentUser from '@root/hooks/useCurrentUser';
import type Party from '@root/models/Party';
import type Story from '@root/models/Story';
import type PartyMember from '@root/models/PartyMember';

import PartyBoardContext from '../contexts/PartyBoardContext';

// We only invoke the Firebase and get the database instance once on the client
// side. This is because the Firebase client is not available on the server side
// as a singleton.This is why we need to create the Firebase client on the
// client side to update the party data in realtime on the client.
createFirebaseClient();

// #region Interfaces & Types

type VoteSession = Required<Pick<Party, 'voteSession'>>['voteSession'];
type VoteStatus = VoteSession['status'];
type PartyRealtime = NonNullable<ContextType<typeof PartyBoardContext>>;

interface PartyRealtimeReducerState {
  party: Party;
  isLoading: boolean;
}

type PartyRealtimeReducerAction =
  | {
      type: 'Update Realtime Party';
      payload: Party;
    }
  | {
      type: 'Switch Loading';
      payload: boolean;
    };

// #endregion

// #region Utilities & Constants

const defaultValues: Party = {
  partyId: '',
  ownerUserId: '',
  stories: [],
  members: [],
  createdAt: '',
  updatedAt: '',
};

const defaultReducerState: PartyRealtimeReducerState = {
  party: defaultValues,
  isLoading: true,
};

function $reducePartyRealtime(
  state = defaultReducerState,
  { type, payload }: PartyRealtimeReducerAction
): PartyRealtimeReducerState {
  switch (type) {
    case 'Update Realtime Party': {
      return {
        ...state,
        party: payload,
      };
    }
    case 'Switch Loading': {
      return {
        ...state,
        isLoading: payload,
      };
    }
    default:
      return state;
  }
}

function $isCurrentUserConnected({
  members,
  currentUserId,
}: Pick<Party, 'members'> & { currentUserId?: string | null }) {
  return (
    members.find(({ userId: memberUserId$ }) => memberUserId$ === currentUserId)
      ?.status === 'Connected'
  );
}

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
  const [{ isLoading, party }, dispatch] = useReducer(
    $reducePartyRealtime,
    defaultReducerState
  );
  const router = useRouter();

  const { userId } = useCurrentUser();

  const setParty = useCallback(
    (nextState: Party | ((previousState: Party) => Party)) => {
      dispatch({
        type: 'Update Realtime Party',
        payload: typeof nextState === 'function' ? nextState(party) : nextState,
      });
    },
    [party]
  );

  const fetchParty = useCallback(
    async (partyId: string) => {
      const database = getDatabase();
      const ref = ref$(database, `parties/${partyId}`);

      const snapshot = await get(ref);
      const party = transformSnapshotIntoPartyDataset(snapshot);

      if (!party) {
        return;
      }

      setParty(party);
    },
    [setParty]
  );

  const addStory = useCallback(
    (story: Story) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'stories');

      const stories = [...party.stories, story];

      set(ref, stories);

      fetchParty(partyId);
    },
    [partyId, party.stories, fetchParty]
  );

  const removeStory = useCallback(
    (storyId: string) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'stories');

      const stories = party.stories.filter(
        ({ storyId: storyId$ }) => storyId$ !== storyId
      );

      set(ref, stories);

      fetchParty(partyId);
    },
    [partyId, party.stories, fetchParty]
  );

  const connectMember = useCallback(
    (member: PartyMember) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'members');

      const members = [...party.members, member];

      update(ref, members);

      fetchParty(partyId);
    },
    [partyId, party.members, fetchParty]
  );

  const disconnectMember = useCallback(
    (memberId: string) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'members');

      const members = party.members.filter(({ userId }) => userId !== memberId);

      update(ref, members);

      fetchParty(partyId);
    },
    [party.members, partyId, fetchParty]
  );

  const editStory = useCallback(
    (storyId: string, partial: Partial<Story>) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'stories');

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

      fetchParty(partyId);
    },
    [party.stories, partyId, fetchParty]
  );

  const rewriteStories = useCallback(
    (stories: Story[]) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'stories');

      set(ref, stories);

      fetchParty(partyId);
    },
    [partyId, fetchParty]
  );

  const resetVotes = useCallback(
    (storyId: string) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'stories');

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

      fetchParty(partyId);
    },
    [partyId, party.stories, fetchParty]
  );

  const revealStoryVotes = useCallback(
    (storyId: string) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'stories');

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

      fetchParty(partyId);
    },
    [party.stories, partyId, fetchParty]
  );

  const createVoteSession = useCallback(
    (partyId: string, storyId: string, voteStatus: VoteStatus) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'voteSession');

      // 60 seconds by default for now
      // TODO: create party configuration so the party owner can change the timer.
      const timer = 60 * 1000;
      const voteSession: VoteSession = {
        currentStoryId: storyId,
        status: voteStatus,
        timer,
      };

      set(ref, voteSession);

      fetchParty(partyId);
    },
    [fetchParty]
  );

  const updateVoteStatus = useCallback(
    (partyId: string, voteStatus: VoteStatus) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'voteSession');

      const voteSession: VoteSession = {
        ...party?.voteSession!,
        status: voteStatus,
      };

      set(ref, voteSession);

      fetchParty(partyId);
    },
    [party.voteSession, fetchParty]
  );

  const voteStory = useCallback(
    (userId: string, storyId: string, vote: number) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'stories');

      const stories = party.stories.map(
        ({ storyId: storyId$, votes = {}, ...story }) => {
          if (storyId === storyId$) {
            const newVotes = {
              ...votes,
              [userId]: vote,
            };

            if (Object.keys(newVotes).length === party.members.length) {
              updateVoteStatus(partyId, 'Revealing');
            }

            return {
              storyId,
              ...story,
              votes: newVotes,
            };
          }

          return { storyId: storyId$, votes, ...story };
        }
      );

      set(ref, stories);

      fetchParty(partyId);
    },
    [partyId, party.stories, party.members.length, fetchParty, updateVoteStatus]
  );

  const resetState = useCallback(
    (party: Party) => {
      const database = getDatabase();
      const ref = ref$(database, `parties/${partyId}`);

      set(ref, party);

      setParty(party);
    },
    [partyId, setParty]
  );

  const tickTimer = useCallback(
    (partyId: string, milliseconds: number) => {
      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'voteSession');

      const voteSession: VoteSession = {
        ...party?.voteSession!,
        timer: milliseconds,
      };

      set(ref, voteSession);

      fetchParty(partyId);
    },
    [party?.voteSession, fetchParty]
  );

  const partyOwner = useMemo(
    () =>
      party.members?.find(({ userId }) => userId === party.ownerUserId) ??
      party.members?.[0],
    [party.members, party.ownerUserId]
  );

  const isCurrentUserPartyOwner = useMemo(
    () => userId === party.ownerUserId,
    [userId, party.ownerUserId]
  );

  useEffect(() => {
    if (!(partyId && isLoading)) {
      return;
    }

    const database = getDatabase();
    const ref = ref$(database, `parties/${partyId}`);

    /**
     * The event listener that is invoked every time a new snapshot is received
     * from the database. This function is also invoked once when the listener
     * is attached to the database.
     *
     * If the {@link DataSnapshot snapshot} does not exist, then we redirect the
     * user to the pathname `/404`.
     *
     * @see {@link DataSnapshot}
     */
    function onSnapshot(snapshot: DataSnapshot) {
      if (!snapshot.exists()) {
        router.push('/404');
        return;
      }
      const party = transformSnapshotIntoPartyDataset(snapshot);

      console.log('🚨 Realtime watcher has got this registry:', party);

      if (!party) {
        return;
      }

      setParty(party);
    }

    (async () => {
      const snapshot = await get(ref);
      onSnapshot(snapshot);
      dispatch({
        type: 'Switch Loading',
        payload: false,
      });
    })();

    const unsubscribe = onValue(ref, onSnapshot);

    return () => {
      unsubscribe();
    };
  }, [isLoading, partyId, router, setParty]);

  useEffect(() => {
    if (!Array(party?.members) || party.members.length === 0) {
      return;
    }

    function handleUnloadEventListener(event: Event) {
      event.preventDefault();

      const currentUserMember = party.members.find(
        ({ userId: memberUserId$ }) => memberUserId$ === userId
      );

      if (!currentUserMember) {
        return;
      }

      const database = getDatabase();
      const ref = child(ref$(database, `parties/${partyId}`), 'members');

      const newMembers = party.members.map<PartyMember>((member) => {
        if (member.userId === userId) {
          return {
            ...member,
            status: 'Disconnected',
          };
        }

        return member;
      });

      set(ref, newMembers);
    }

    window.addEventListener('unload', handleUnloadEventListener);

    return () => {
      window.removeEventListener('unload', handleUnloadEventListener);
    };
  }, [party?.members, partyId, userId]);

  useEffect(() => {
    if (
      !Array.isArray(party?.members) ||
      party.members.length === 0 ||
      // If the user's status is "Connected", then the user is already connected
      // and we don't need to update the status.
      $isCurrentUserConnected({ members: party.members, currentUserId: userId })
    ) {
      return;
    }

    const database = getDatabase();
    const ref = ref$(database, `parties/${partyId}`);
    const refChild = child(ref, 'members');

    const newMembers = party.members.map<PartyMember>((member) => {
      if (member.userId === userId) {
        return {
          ...member,
          status: 'Connected',
        };
      }

      return member;
    });

    set(refChild, newMembers);
  }, [party?.members, partyId, userId]);

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
    isLoading,
  };
}
