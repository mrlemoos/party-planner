"use client";

import { useMemo, type JSX, useEffect } from "react";

import { ClockIcon } from "@radix-ui/react-icons";
import cls from "classnames";

import AfloatBottomBar from "@root/components/atoms/AfloatBottomBar";
import RobotoMono from "@root/styles/RobotoMono";

import usePartyBoardContext from "../../context-hooks/usePartyBoardContext";

// #region Utilities & Constants

function formatTime(time: number): string {
  const rawMinutes = Math.floor(time / 60);
  const minutes = rawMinutes < 10 ? `0${rawMinutes}` : rawMinutes;

  const rawSeconds = time % 60;
  const seconds = rawSeconds < 10 ? `0${rawSeconds}` : rawSeconds;

  return `${minutes}:${seconds}`;
}

const allowedVoteSessionStatuses = ["Voting", "Revealing"] as (string | undefined)[];

// #endregion

export default function Timer(): JSX.Element | null {
  const { voteSession, tickTimer, partyId, updateVoteStatus, isCurrentUserPartyOwner } = usePartyBoardContext();

  const timeInSeconds = useMemo(
    () => (typeof voteSession?.timer !== "number" ? -1 : Math.floor(voteSession.timer / 1000)),
    [voteSession?.timer]
  );

  const time = useMemo(() => {
    if (voteSession?.status !== "Voting") {
      return "00:00";
    }

    return formatTime(timeInSeconds);
  }, [timeInSeconds, voteSession?.status]);

  useEffect(() => {
    if (timeInSeconds === -1 || typeof voteSession?.timer === "undefined" || !isCurrentUserPartyOwner) {
      return;
    }

    if (voteSession.timer === 0) {
      if (voteSession.status !== "Revealing") {
        updateVoteStatus(partyId, "Revealing");
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

  if (!allowedVoteSessionStatuses.includes(voteSession?.status) || timeInSeconds === -1) {
    return null;
  }

  const isCountingDownHighlighted = timeInSeconds > 0 && timeInSeconds <= 10;

  return (
    <AfloatBottomBar
      className="flex items-center gap-2 px-3 py-2 transition-all bg-red-700 pointer-events-none animate-scale-in-content"
      style={{
        backgroundColor: isCountingDownHighlighted ? "rgb(185 28 28)" : undefined,
        color: isCountingDownHighlighted ? "white" : undefined,
      }}
    >
      <ClockIcon height={20} width={20} />
      <span className={cls("text-lg", RobotoMono.className)}>{time}</span>
    </AfloatBottomBar>
  );
}
