import { type JSX } from 'react';

import Loading from '@root/components/atoms/Loading';

export default function PartyBoardLoading(): JSX.Element {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Loading>Arriving at the party</Loading>
    </div>
  );
}
