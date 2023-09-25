'use client';

import { useMemo, type JSX } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import usePartyBoardContext from '../../context-hooks/usePartyBoardContext';
import isGeneratedStoryId from '../../util/isGeneratedStoryId';
import TaskVoteCard from '../molecules/TaskVoteCard';

// #region Interfaces & Types

interface VotingBoardProps {
  storyId: string;
}

// #endregion

// #region Utilities & Constants

const earlyFibonacciSequence = [
  { value: 1, importantComment: 'Nah, it‘s done already 👌' },
  { value: 2, importantComment: 'Definitely not a spaceship 🚀' },
  { value: 3, importantComment: 'Alright, alright, alright 🤠' },
  { value: 5, importantComment: 'A five out of ten 😌' },
  { value: 8, importantComment: 'Am I gonna deliver? Well... 😬' },
  { value: 13, importantComment: 'Is it friday? 😨' },
  { value: 21, importantComment: 'Are we playing joker or 🃏?' },
];

// #endregion

export default function VotingBoard({
  storyId,
}: VotingBoardProps): JSX.Element {
  const { stories, voteSession } = usePartyBoardContext();

  const computedStory = useMemo(
    () => stories.find(({ storyId: storyId$ }) => storyId$ === storyId)!,
    [stories, storyId],
  );

  const isUserAllowedToVote = useMemo(
    () => voteSession?.status === 'Voting',
    [voteSession?.status],
  );
  const hasUserStory = useMemo(
    () => [computedStory.title, computedStory.storyId].every(Boolean),
    [computedStory.title, computedStory.storyId],
  );

  return (
    <div className="flex flex-col gap-3 relative">
      {hasUserStory && (
        <div className="flex items-center gap-2">
          {!isGeneratedStoryId(computedStory.storyId) && (
            <span className="font-normal text-gray-500 animate-scale-in-content">
              {computedStory.storyId}
            </span>
          )}
          <span className="font-medium animate-scale-in-content">
            {computedStory.title}
          </span>
        </div>
      )}

      <AnimatePresence>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100%', transition: { duration: 0.5 } }}
          exit={{ height: 0 }}
          className="flex justify-center items-center flex-wrap gap-3 mb-8"
        >
          {earlyFibonacciSequence.map(({ value, importantComment }) => (
            <TaskVoteCard
              key={value}
              storyId={storyId}
              cardValue={value}
              importantComment={importantComment}
              isUserAllowedToVote={isUserAllowedToVote}
              computedStory={computedStory}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
