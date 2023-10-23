'use client';

import { useMemo, type JSX, useCallback } from 'react';

import Button from '@root/components/atoms/Button';
import SizedBox from '@root/components/atoms/SizedBox';

import usePartyBoardContext from '../../context-hooks/usePartyBoardContext';

export default function StartVote(): JSX.Element | null {
  const {
    voteSession,
    stories,
    isCurrentUserPartyOwner,
    updateVoteStatus,
    partyId,
    partyOwner,
  } = usePartyBoardContext();

  const story = useMemo(
    () =>
      stories.find(({ storyId }) => storyId === voteSession?.currentStoryId),
    [stories, voteSession?.currentStoryId],
  );

  const handleStartVote = useCallback(() => {
    if (!isCurrentUserPartyOwner) {
      return;
    }

    updateVoteStatus(partyId, 'Voting');
  }, [isCurrentUserPartyOwner, partyId, updateVoteStatus]);

  if (isCurrentUserPartyOwner) {
    return (
      <div className="flex animate-scale-in-content justify-center">
        {voteSession?.currentStoryId &&
        story?.storyId === voteSession.currentStoryId ? (
          <div className="mt-4 flex flex-col items-center">
            <span className="font-normal">
              Tap the button below to start voting on{' '}
              <span className="font-medium">{story?.title}</span>.
            </span>
            <SizedBox height={28} />
            <Button className="mt-6" onClick={handleStartVote}>
              Start Vote
            </Button>
          </div>
        ) : (
          <span>Pick a story to start voting.</span>
        )}
      </div>
    );
  }

  if (partyOwner?.displayName) {
    return (
      <h5 className="animate-scale-in text-xl">
        Waiting for the{' '}
        <span className="font-medium">{partyOwner.displayName}</span> to start
        voting 🥱.
      </h5>
    );
  }

  return null;
}
