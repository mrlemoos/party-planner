'use client';

import { useMemo, type JSX, useEffect } from 'react';

import { ClockIcon } from '@radix-ui/react-icons';
import cls from 'classnames';

import AfloatBottomBar from '@root/components/atoms/AfloatBottomBar';
import Inter from '@root/styles/Inter';

import usePartyBoardContext from '../../context-hooks/usePartyBoardContext';

// #region Interfaces & Types

type FormattedTime = `${number}:${number}`;

// #endregion

// #region Utilities & Constants

function $formatTime(time: number): FormattedTime {
  const rawMinutes = Math.floor(time / 60);
  const minutes = String(rawMinutes).padStart(2, '0');

  const rawSeconds = time % 60;
  const seconds = String(rawSeconds).padStart(2, '0');

  return `${minutes}:${seconds}` as FormattedTime;
}

const ALLOWED_VOTE_SESSION_STATUSES = ['Voting', 'Revealing'] as (
  | string
  | undefined
)[];

const DEFAULT_TIME = '00:00';

const HIGHLIGHT_BACKGROUND_COLOR = 'rgb(185 28 28)';
const HIGHLIGHT_FOREGROUND_COLOR = '#fff';

function getHighlightBackground(isHighlighted: boolean) {
  return isHighlighted ? HIGHLIGHT_BACKGROUND_COLOR : undefined;
}

function getHighlightForeground(isHighlighted: boolean) {
  return isHighlighted ? HIGHLIGHT_FOREGROUND_COLOR : undefined;
}

// #endregion

export default function Timer(): JSX.Element | null {
  const {
    voteSession,
    tickTimer,
    partyId,
    updateVoteStatus,
    isCurrentUserPartyOwner,
  } = usePartyBoardContext();

  const timeInSeconds = useMemo(
    () =>
      typeof voteSession?.timer !== 'number'
        ? -1
        : Math.floor(voteSession.timer / 1000),
    [voteSession?.timer],
  );

  const time = useMemo(() => {
    if (voteSession?.status !== 'Voting') {
      return DEFAULT_TIME;
    }

    return $formatTime(timeInSeconds);
  }, [timeInSeconds, voteSession?.status]);

  useEffect(() => {
    if (
      timeInSeconds === -1 ||
      typeof voteSession?.timer === 'undefined' ||
      !isCurrentUserPartyOwner
    ) {
      return;
    }

    if (voteSession.timer === 0) {
      if (voteSession.status !== 'Revealing') {
        updateVoteStatus(partyId, 'Revealing');
      }
      return;
    }

    const timer = setTimeout(() => {
      const timer = voteSession.timer - 1000;
      const milliseconds = timer < 0 ? 0 : timer;

      tickTimer(partyId, milliseconds);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    timeInSeconds,
    voteSession?.timer,
    voteSession?.status,
    tickTimer,
    partyId,
    updateVoteStatus,
    isCurrentUserPartyOwner,
  ]);

  const isCountingDownHighlighted = timeInSeconds > 0 && timeInSeconds <= 10;

  const backgroundColor = useMemo(
    () => getHighlightBackground(isCountingDownHighlighted),
    [isCountingDownHighlighted],
  );
  const color = useMemo(
    () => getHighlightForeground(isCountingDownHighlighted),
    [isCountingDownHighlighted],
  );

  if (
    !ALLOWED_VOTE_SESSION_STATUSES.includes(voteSession?.status) ||
    timeInSeconds === -1
  ) {
    return null;
  }

  return (
    <AfloatBottomBar
      className="pointer-events-none flex animate-scale-in-content items-center gap-2 bg-red-700 px-3 py-2 transition-all"
      style={{
        backgroundColor,
        color,
      }}
    >
      <ClockIcon height={20} width={20} />
      <span className={cls('w-12 text-lg', Inter.className)}>{time}</span>
    </AfloatBottomBar>
  );
}
