import { type JSX } from 'react';

import PartyBoard from '@root/features/party-board/PartyBoard';
import fetchParty from '@root/services/fetchParty';

interface PartyBoardBoardParams {
  partyId: string;
}

interface PartyBoardBoardProps {
  params: PartyBoardBoardParams;
}

export default function PartyBoardPage({
  params: { partyId },
}: PartyBoardBoardProps): JSX.Element {
  return <PartyBoard partyId={partyId} />;
}
