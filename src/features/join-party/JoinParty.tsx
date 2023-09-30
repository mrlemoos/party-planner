'use client';

import { useEffect, type JSX } from 'react';

import { useRouter, useParams } from 'next/navigation';

import Loading from '@root/components/atoms/Loading';

import JoinPartyFailure from './components/atoms/JoinPartyFailure';
import getPartyBoardLink from '@root/util/getPartyBoardLink';

// #region Interfaces & Types

interface JoinPartyProps {
  error?: string;
}

// #endregion

// #region Constants & Utilities

function $isServerErrorValid(error?: string): boolean {
  return typeof error === 'string' && error.length >= 1;
}

// #endregion

export default function JoinParty({ error }: JoinPartyProps): JSX.Element {
  const router = useRouter();
  const params = useParams();

  const hasError = $isServerErrorValid(error);

  useEffect(() => {
    if (hasError) {
      return;
    }

    const partyId = Array.isArray(params.partyId)
      ? params.partyId[0]
      : params.partyId;
    const link = getPartyBoardLink(partyId, { as: 'relative' });
    router.push(link);
  }, [hasError, params.partyId, router]);

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      {hasError ? (
        <JoinPartyFailure error={error} />
      ) : (
        <Loading isLogoMinimum={true}>Joining the party</Loading>
      )}
    </main>
  );
}
