"use client";

import { type ReactNode, type JSX, useState, useCallback, useMemo } from "react";

import { useAuth } from "@clerk/nextjs";
import { type MotionStyle, motion, type Variant } from "framer-motion";
import cls from "classnames";

import type Story from "@root/models/Story";

import usePartyBoardContext from "../../context-hooks/usePartyBoardContext";
import StoryPointSticks from "../atoms/StoryPointSticks";
import UserVoteIndicator from "../atoms/UserVoteIndicator";

// #region Interfaces & Types

interface TaskVoteCardProps {
  cardValue: number;
  importantComment: ReactNode;
  storyId: string;
  isUserAllowedToVote: boolean;
  computedStory: Story;
}

// #endregion

// #region Constants & Utilities

const style: MotionStyle = {
  height: 320,
  width: 200,
};

const animationVariants: {
  [K in "selected" | "non-selected"]: Variant;
} = {
  selected: {
    transition: {
      duration: 0.35,
    },
    rotateY: 360,
  },
  "non-selected": {
    transition: {
      duration: 0.35,
    },
    rotateY: 0,
  },
};

const defaultCardBackgroundColor = "#e0fbfc";
const hoveredCardBackgroundColor = "#f0fdfd";

// #endregion

export default function TaskVoteCard({
  cardValue,
  importantComment,
  storyId,
  isUserAllowedToVote,
  computedStory,
}: TaskVoteCardProps): JSX.Element {
  const [isHovered, setHovered] = useState(false);

  const { voteSession, voteStory } = usePartyBoardContext();

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  const { userId } = useAuth();

  const handleVoteStory = useCallback(() => voteStory(userId!, storyId, cardValue), [voteStory, userId, storyId, cardValue]);

  const hasVotedThisUserStoryWithThisCard = useMemo(() => {
    if (!userId) {
      return false;
    }

    const vote = computedStory?.votes?.[userId];

    return typeof vote === "number" && cardValue === vote;
  }, [computedStory, userId, cardValue]);

  const disabled = useMemo(
    () => voteSession?.status !== "Voting" || hasVotedThisUserStoryWithThisCard || !isUserAllowedToVote,
    [voteSession?.status, hasVotedThisUserStoryWithThisCard, isUserAllowedToVote],
  );

  return (
    <div className='relative'>
      <motion.div
        onClick={handleVoteStory}
        className={cls(
          "py-6 px-1 bg-white rounded-lg shadow-md flex flex-col justify-between items-center",
          disabled ? "pointer-events-none cursor-default" : "cursor-pointer",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        variants={animationVariants}
        animate={{
          scale: isHovered ? 1.05 : 1,
          backgroundColor: isHovered ? hoveredCardBackgroundColor : defaultCardBackgroundColor,
          ...animationVariants[hasVotedThisUserStoryWithThisCard ? "selected" : "non-selected"],
        }}
        style={style}
      >
        <div aria-hidden='true' />
        <div className='flex flex-col justify-center items-center'>
          <span className='font-medium text-black' style={{ fontSize: 48 }}>
            {cardValue}
          </span>
          <StoryPointSticks totalStoryPoints={cardValue} />
        </div>
        <span className='mb-3 px-4 text-center text-xs text-gray-500 font-medium'>{importantComment}</span>
      </motion.div>
      {hasVotedThisUserStoryWithThisCard && <UserVoteIndicator />}
    </div>
  );
}
