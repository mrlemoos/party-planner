import { type JSX } from 'react';

import Loading from '@root/components/atoms/Loading';

export default function PartyBoardLoading(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loading>Arriving at the party</Loading>
    </div>
  );
}
