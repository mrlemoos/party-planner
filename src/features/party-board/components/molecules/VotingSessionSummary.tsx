import { useMemo, type JSX, type CSSProperties } from "react";

import { type AnimationProps, motion } from "framer-motion";
import cls from "classnames";

import useWindowSize from "@root/hooks/useWindowSize";
import Poppins from "@root/styles/Poppins";
import Avatar from "@root/components/molecules/Avatar";
import toRem from "@root/util/toRem";

import usePartyBoardContext from "../../context-hooks/usePartyBoardContext";
import PercentageBar from "../atoms/PercentageBar";

// #region Interfaces & Types

type InitialProp = AnimationProps["initial"];
type AnimateProp = AnimationProps["animate"];

interface AnimationMap {
  initial: InitialProp;
  animate: AnimateProp;
}

// #endregion

// #region Utilities & Constants

const animationCanvasStyle: CSSProperties = {
  height: toRem(380),
};

const animation: AnimationMap = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: toRem(280),
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

// #endregion

export default function VotingSessionSummary(): JSX.Element {
  const { voteSession, stories, members } = usePartyBoardContext();

  const { width } = useWindowSize();

  const currentStory = useMemo(
    () => stories.find(({ storyId }) => storyId === voteSession?.currentStoryId),
    [stories, voteSession?.currentStoryId],
  );

  const { winnerStoryPoint, votesCount } = useMemo(() => {
    if (!currentStory?.votes) {
      return {};
    }

    const votes = Object.values(currentStory.votes);

    let winnerStoryPoint: number | null = null;
    let winnerStoryPointCount = 0;

    for (const vote of votes) {
      const voteCount = votes.filter((voteValue) => voteValue === vote).length;

      if (voteCount > winnerStoryPointCount) {
        winnerStoryPoint = vote;
        winnerStoryPointCount = voteCount;
      }
    }

    return { winnerStoryPoint, votesCount: winnerStoryPointCount };
  }, [currentStory?.votes]);

  const memberVotes = useMemo(() => {
    if (!currentStory?.votes) {
      return [];
    }

    const votes = Object.values(currentStory.votes).map((vote) => {
      const memberUserIdWithSameVote = Object.entries(currentStory.votes)
        .filter(([, voteValue]) => voteValue === vote)
        .map(([memberUserId]) => memberUserId);

      const memberDisplayNames = members
        .filter(({ userId }) => memberUserIdWithSameVote.includes(userId))
        .map(({ displayName }) => displayName);

      const percentage = (memberDisplayNames.length / members.length) * 100;

      const isWinner = vote === winnerStoryPoint;

      return {
        vote,
        memberDisplayNames,
        percentage,
        isWinner,
      };
    });

    return votes;
  }, [currentStory?.votes, members, winnerStoryPoint]);

  return (
    <div className='flex items-center gap-4'>
      <div className='flex justify-center items-center flex-1 animate-scale-in-content delay-500'>
        <span className='flex flex-col items-center gap-3'>
          <span className='font-medium text-xl mb-5'>{currentStory?.title}</span>
          <span className='font-normal text-sm'>
            <b>{votesCount}</b> members have formed a majority of the votes
            <span className='text-2xl ml-2'>🏆</span>
          </span>
          <span className={cls("text-3xl font-bold", Poppins.className)}>{winnerStoryPoint}</span>
        </span>
      </div>
      {width > 900 && (
        <div className='flex flex-col items-center gap-3 flex-1'>
          <div className='flex gap-x-4 gap-y-2 items-center animate-scale-in-content' style={animationCanvasStyle}>
            {memberVotes.map(({ vote, memberDisplayNames, percentage }) => (
              <div key={`${vote}-vote`} className='flex items-center flex-col gap-1'>
                <motion.div initial={animation.initial} animate={animation.animate}>
                  <PercentageBar percentage={percentage} />
                </motion.div>
                <span className={cls("text-xl font-normal mt-3", Poppins.className)}>{vote}</span>
                {memberDisplayNames.map((displayName) => (
                  <Avatar key={displayName} size='small' tooltipSide='bottom'>
                    {displayName}
                  </Avatar>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
