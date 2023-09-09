"use client";

import { type JSX } from "react";

import type Party from "@root/models/Party";
import SizedBox from "@root/components/atoms/SizedBox";

import usePartyRealtime from "./hooks/usePartyRealtime";
import UserStoryList from "./components/UserStoryList";
import PartyBoardProvider from "./providers/PartyBoardProvider";
import VotingResults from "./components/VotingResults";
import ConnectedMembers from "./components/ConnectedMembers";

type PartyBoardProps = Pick<Party, "partyId">;

export default function PartyBoard({ partyId }: PartyBoardProps): JSX.Element {
  const {
    addStory,
    editStory,
    connectMember,
    disconnectMember,
    members,
    ownerUserId,
    partyOwner,
    removeStory,
    resetState,
    resetVotes,
    revealStoryVotes,
    stories,
    voteStory,
  } = usePartyRealtime(partyId);

  return (
    <PartyBoardProvider
      addStory={addStory}
      connectMember={connectMember}
      disconnectMember={disconnectMember}
      members={members}
      ownerUserId={ownerUserId}
      partyOwner={partyOwner}
      removeStory={removeStory}
      resetVotes={resetVotes}
      revealStoryVotes={revealStoryVotes}
      stories={stories}
      voteStory={voteStory}
      partyId={partyId}
      resetState={resetState}
      editStory={editStory}
    >
      <SizedBox height={30} />
      <ConnectedMembers />

      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex flex-row gap-3">
            <div className="flex-1">
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
