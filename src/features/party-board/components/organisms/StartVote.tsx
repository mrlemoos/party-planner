"use client";

import { useMemo, type JSX, useCallback } from "react";

import Button from "@root/components/atoms/Button";
import SizedBox from "@root/components/atoms/SizedBox";

import usePartyBoardContext from "../../context-hooks/usePartyBoardContext";

export default function StartVote(): JSX.Element {
  const { voteSession, stories, isCurrentUserPartyOwner, updateVoteStatus, partyId, partyOwner } = usePartyBoardContext();

  const story = useMemo(
    () => stories.find(({ storyId }) => storyId === voteSession?.currentStoryId),
    [stories, voteSession?.currentStoryId],
  );

  const handleStartVote = useCallback(() => {
    if (!isCurrentUserPartyOwner) {
      return;
    }

    updateVoteStatus(partyId, "Voting");
  }, [isCurrentUserPartyOwner, partyId, updateVoteStatus]);

  if (isCurrentUserPartyOwner) {
    return (
      <div className='flex justify-center animate-scale-in-content'>
        {voteSession?.currentStoryId && story?.storyId === voteSession.currentStoryId ? (
          <div className='flex flex-col items-center mt-4'>
            <span className='font-normal'>
              Tap the button below to start voting on <span className='font-medium'>{story?.title}</span>.
            </span>
            <SizedBox height={28} />
            <Button className='mt-6' onClick={handleStartVote}>
              Start Vote
            </Button>
          </div>
        ) : (
          <span>Pick a story to start voting.</span>
        )}
      </div>
    );
  }

  return (
    <h5 className='text-xl animate-scale-in'>
      Waiting for the <span className='font-medium'>{partyOwner.displayName}</span> to start voting 🥱.
    </h5>
  );
}
