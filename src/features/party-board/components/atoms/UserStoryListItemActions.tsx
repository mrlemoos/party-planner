"use client";

import { useCallback, type JSX, Fragment } from "react";

import { TrashIcon } from "@radix-ui/react-icons";

import TextButton from "@root/components/atoms/TextButton";
import IconButton from "@root/components/atoms/IconButton";
import type Story from "@root/models/Story";

import usePartyBoardContext from "../../context-hooks/usePartyBoardContext";

interface UserStoryListItemActionsProps {
  storyId: string;
  isStoryCurrentlyBeingVotedOn: boolean;
  computedStory: Story;
}

export default function UserStoryListItemActions({
  storyId,
  isStoryCurrentlyBeingVotedOn,
  computedStory,
}: UserStoryListItemActionsProps): JSX.Element | null {
  const { stories, rewriteStories, isCurrentUserPartyOwner, partyId, createVoteSession } = usePartyBoardContext();

  const handleSkipStory = useCallback(
    function handleSkipStory$() {
      const newStories = [...stories.filter(({ storyId: storyId$ }) => storyId$ !== storyId), computedStory];

      rewriteStories(newStories);

      const nextStoryId = newStories[0]?.storyId;

      if (nextStoryId) {
        createVoteSession(partyId, newStories[0]?.storyId, "Not Started");
      }
    },
    [stories, computedStory, rewriteStories, storyId, createVoteSession, partyId]
  );

  const handleStartVote = useCallback(() => {
    const newStories = [computedStory, ...stories.filter(({ storyId: storyId$ }) => storyId$ !== storyId)];

    rewriteStories(newStories);
    createVoteSession(partyId, storyId, "Not Started");
  }, [computedStory, stories, rewriteStories, createVoteSession, partyId, storyId]);

  if (!isCurrentUserPartyOwner) {
    return null;
  }

  return (
    <Fragment>
      <IconButton
        aria-label='Delete User Story'
        className='bg-transparent hover:bg-red-300 dark:hover:bg-transparent'
        icon={<TrashIcon height={18} width={18} className='text-red-500' />}
        alt={`Delete User Story ${computedStory.title}`}
      />

      {stories.length > 1 && isStoryCurrentlyBeingVotedOn ? (
        <TextButton className='text-sm' onClick={handleSkipStory}>
          Skip
        </TextButton>
      ) : (
        <TextButton className='text-sm' onClick={handleStartVote}>
          Vote
        </TextButton>
      )}
    </Fragment>
  );
}
