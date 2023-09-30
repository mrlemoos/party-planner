import { type JSX } from 'react';

import PartyBoard from '@root/features/party-board/PartyBoard';

interface PartyBoardBoardParams {
  partyId: string;
}

interface PartyBoardBoardProps {
  params: PartyBoardBoardParams;
}

function PartyBoardPage({
  params: { partyId },
}: PartyBoardBoardProps): JSX.Element {
  return <PartyBoard partyId={partyId} />;
}

export default PartyBoardPage;
