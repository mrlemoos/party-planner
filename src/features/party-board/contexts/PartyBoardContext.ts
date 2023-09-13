"use client";

import { createContext } from "react";

import type Party from "@root/models/Party";
import type PartyMember from "@root/models/PartyMember";
import type Story from "@root/models/Story";

type PickedParty = Pick<Party, "members" | "partyId" | "ownerUserId" | "voteSession">;
type VoteStatus = Required<Pick<Party, "voteSession">>["voteSession"]["status"];

interface PartyBoardContextSchema extends PickedParty {
  stories: Story[];
  partyOwner: PartyMember;

  addStory(story: Story): void;
  removeStory(storyId: string): void;
  editStory(storyId: string, story: Partial<Story>): void;
  rewriteStories(stories: Story[]): void;
  voteStory(userId: string, storyId: string, vote: number): void;
  resetVotes(storyId: string): void;
  revealStoryVotes(storyId: string): void;

  connectMember(member: PartyMember): void;
  disconnectMember(memberId: string): void;

  resetState(state: Partial<PickedParty & { stories: Story[]; partyOwner: PartyMember }>): void;

  isCurrentUserPartyOwner: boolean;

  createVoteSession(partyId: string, storyId: string, voteStatus: VoteStatus): void;
  updateVoteStatus(partyId: string, voteStatus: VoteStatus): void;
  tickTimer(partyId: string, milliseconds: number): void;
}

const PartyBoardContext = createContext<PartyBoardContextSchema | null>(null);

export default PartyBoardContext;
