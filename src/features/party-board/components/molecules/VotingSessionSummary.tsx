'use client';

import { useMemo, type JSX, type CSSProperties, useCallback } from 'react';

import { type AnimationProps, motion } from 'framer-motion';
import cls from 'classnames';

import useWindowSize from '@root/hooks/useWindowSize';
import Poppins from '@root/styles/Poppins';
import getAverageOf from '@root/util/getAverageOf';
import removeDuplicates from '@root/util/removeDuplicates';
import toRem from '@root/util/toRem';
import SizedBox from '@root/components/atoms/SizedBox';
import UserDot from '@root/components/molecules/UserDot';
import OpaqueButton from '@root/components/atoms/OpaqueButton';
import TextButton from '@root/components/atoms/TextButton';

import usePartyBoardContext from '../../context-hooks/usePartyBoardContext';
import PercentageBar from '../atoms/PercentageBar';

// #region Interfaces & Types

type InitialProp = AnimationProps['initial'];
type AnimateProp = AnimationProps['animate'];

interface AnimationMap {
  initial: InitialProp;
  animate: AnimateProp;
}

// #endregion

// #region Utilities & Constants

const percentageBarHeight = toRem(280);

const animationCanvasStyle: CSSProperties = {
  height: toRem(380),
};

const animation: AnimationMap = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: percentageBarHeight,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 1,
    },
  },
};

// #endregion

export default function VotingSessionSummary(): JSX.Element {
  const {
    voteSession,
    stories,
    members,
    createVoteSession,
    partyId,
    rewriteStories,
  } = usePartyBoardContext();

  const { width } = useWindowSize();

  const currentStory = useMemo(
    () =>
      stories.find(({ storyId }) => storyId === voteSession?.currentStoryId),
    [stories, voteSession?.currentStoryId]
  );

  const { averageResult, votesCount } = useMemo(() => {
    if (!currentStory?.votes) {
      return {};
    }

    const votes = Object.values(currentStory.votes);
    const averageOfTotalVotes = getAverageOf(votes);

    const averageResult =
      // If the average is NaN, display N/A so the user doesn't see a NaN string
      // on the screen.
      Number.isNaN(averageOfTotalVotes)
        ? 'N/A'
        : String(averageOfTotalVotes.toFixed(1)).replace('.0', '');

    const votesCount = votes.length;

    return { averageResult, votesCount };
  }, [currentStory?.votes]);

  const memberVotes = useMemo(() => {
    if (!currentStory?.votes) {
      return [];
    }

    const voteResults = Object.values(currentStory.votes);
    const uniqueVoteResults = removeDuplicates(voteResults);

    const votesAsEntries = Object.entries(currentStory.votes);

    const votes = uniqueVoteResults.map((vote) => {
      const memberUserIdWithSameVote = votesAsEntries
        .filter(([, voteValue]) => voteValue === vote)
        .map(([memberUserId]) => memberUserId);

      const membersWhoVoted = members
        .filter(({ userId }) => memberUserIdWithSameVote.includes(userId))
        .map(({ displayName, userId }) => ({ userId, displayName }));

      const percentage = (membersWhoVoted.length / members.length) * 100;

      return {
        vote,
        membersWhoVoted,
        percentage,
      };
    });

    return votes;
  }, [currentStory?.votes, members]);

  const handleVoteAgain = useCallback(() => {
    if (!voteSession?.currentStoryId) {
      return;
    }

    createVoteSession(partyId, voteSession.currentStoryId, 'Voting');

    const newStories = stories.map((story) => ({
      ...story,
      votes: {},
    }));

    rewriteStories(newStories);
  }, [
    voteSession?.currentStoryId,
    createVoteSession,
    partyId,
    stories,
    rewriteStories,
  ]);

  const handleVoteNext = useCallback(() => {
    if (!voteSession?.currentStoryId) {
      return;
    }

    const newStories = stories.map((story) =>
      story.storyId === voteSession.currentStoryId
        ? {
            ...story,
            isRevealed: true,
          }
        : story
    );

    rewriteStories(newStories);

    const currentStoryIndex = stories.findIndex(
      ({ storyId }) => storyId === voteSession?.currentStoryId
    );
    const nextStoryIndex =
      typeof currentStoryIndex === 'number' ? currentStoryIndex + 1 : 0;

    const nextStory = stories[nextStoryIndex];

    if (!nextStory) {
      return;
    }

    createVoteSession(partyId, nextStory.storyId, 'Not Started');
  }, [
    voteSession?.currentStoryId,
    stories,
    rewriteStories,
    createVoteSession,
    partyId,
  ]);

  const nonVotedStories = useMemo(
    () =>
      stories.filter(({ votes, isRevealed, storyId }) => {
        if (
          storyId === voteSession?.currentStoryId ||
          isRevealed ||
          typeof votes !== 'object'
        ) {
          return false;
        }

        const votesLength = Object.keys(votes).length;

        return votesLength !== members.length;
      }),
    [members.length, stories, voteSession?.currentStoryId]
  );

  const hasVoteNextStoryButton = useMemo(() => {
    if (nonVotedStories.length === 0) {
      return false;
    }

    const currentStoryIndex = nonVotedStories.findIndex(
      ({ storyId }) => storyId === voteSession?.currentStoryId
    );

    const isLast = currentStoryIndex === stories.length - 1;

    if (isLast) {
      return false;
    }
  }, [nonVotedStories, stories.length, voteSession?.currentStoryId]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex justify-center items-center flex-1 animate-scale-in-content delay-500">
        <div className="flex flex-col items-center gap-3">
          <span className="font-semibold text-xl mb-5">
            {currentStory?.title}
          </span>
          <span className="font-normal text-sm">
            <b>{votesCount}</b> members have formed a majority of the votes
            <span className="text-2xl ml-2">🏆</span>
          </span>
          <span className={cls('text-3xl font-semibold', Poppins.className)}>
            {averageResult}
          </span>
          <div className="flex items-center gap-2 ml-3">
            <TextButton onClick={handleVoteAgain}>Vote again</TextButton>
            {hasVoteNextStoryButton && (
              <OpaqueButton onClick={handleVoteNext}>Next</OpaqueButton>
            )}
          </div>
        </div>
      </div>
      {width > 900 && (
        <div className="flex flex-col items-center gap-3 flex-1">
          <SizedBox height={32} />
          <div
            className="flex gap-1 animate-scale-in-content"
            style={animationCanvasStyle}
          >
            {memberVotes.map(({ vote, membersWhoVoted, percentage }) => (
              <div key={`${vote}-vote`} className="flex items-center flex-col">
                <div className="flex flex-col">
                  <motion.div
                    initial={animation.initial}
                    animate={animation.animate}
                  >
                    <PercentageBar percentage={percentage} />
                  </motion.div>
                </div>
                <span
                  className={cls('text-xl font-normal mt-3', Poppins.className)}
                >
                  {vote}
                </span>
                <div className="flex items-center">
                  {membersWhoVoted.map(({ displayName, userId }) => (
                    <UserDot
                      key={`${userId}-user-dot`}
                      userId={userId}
                      userDisplayName={displayName}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
