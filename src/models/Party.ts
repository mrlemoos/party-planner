import type PartyMember from './PartyMember';
import type Story from './Story';

export default interface Party {
  ownerUserId: string;
  partyId: string;

  stories: Story[];
  members: PartyMember[];

  createdAt: string;
  updatedAt: string;

  voteSession?: {
    currentStoryId: string;
    status: 'Voting' | 'Not Started' | 'Revealing' | 'Finished';
    timer: number;
  };
}
