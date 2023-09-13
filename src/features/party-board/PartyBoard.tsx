"use client";

import { useMemo, type JSX } from "react";

import useWindowSize from "@root/hooks/useWindowSize";
import type Party from "@root/models/Party";
import SizedBox from "@root/components/atoms/SizedBox";

import usePartyRealtime from "./hooks/usePartyRealtime";
import UserStoryList from "./components/organisms/UserStoryList";
import ConnectedMembers from "./components/molecules/ConnectedMembers";
import VotingSessionSummary from "./components/molecules/VotingSessionSummary";
import PartyBoardProvider from "./providers/PartyBoardProvider";
import VotingResults from "./components/organisms/VotingResults";
import VotingBoard from "./components/organisms/VotingBoard";
import StartVote from "./components/organisms/StartVote";
import Timer from "./components/atoms/Timer";

type PartyBoardProps = Pick<Party, "partyId">;

export default function PartyBoard({ partyId }: PartyBoardProps): JSX.Element {
  const { voteSession, ...realtime } = usePartyRealtime(partyId);

  const { width } = useWindowSize();

  const shouldShowVotingBoard = useMemo(
    () => typeof voteSession?.currentStoryId === "string" && voteSession?.status === "Voting",
    [voteSession?.currentStoryId, voteSession?.status]
  );
  const shouldShowStartVote = useMemo(() => voteSession?.status === "Not Started", [voteSession?.status]);

  const shouldShowVotingSessionSummary = useMemo(() => voteSession?.status === "Revealing", [voteSession?.status]);

  return (
    <PartyBoardProvider {...realtime} voteSession={voteSession}>
      <SizedBox height={30} />

      <ConnectedMembers />
      <Timer />

      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          {shouldShowStartVote && <StartVote />}
          {shouldShowVotingBoard && <VotingBoard storyId={voteSession!.currentStoryId} />}
          {shouldShowVotingSessionSummary && <VotingSessionSummary />}
          <SizedBox height={64} />
          <div className="flex gap-3" style={{ flexDirection: width < 1000 ? "column" : "row" }}>
            <div className="flex-1 gap-5">
              <UserStoryList />
            </div>
            <div>
              <VotingResults />
            </div>
          </div>
        </div>
      </div>
    </PartyBoardProvider>
  );
}
