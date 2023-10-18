'use client';

import { useEffect, useMemo } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import AnimatedTextContentVariants from '../constants/AnimatedTextContentVariants';
import SearchParamsPresentationKeyMap from '../constants/SearchParamsPresentationKeyMap';

// #region Interfaces & Types

interface UseInfinitePresentationResult {
  presentationIndex: number;
  presentationKey: PresentationKey;
  totalPresentations: number;
}

type PresentationKey = keyof typeof AnimatedTextContentVariants;

// #endregion

// #region Constants & Utilities

const PRIMARY_PRESENTATION_INTERVAL = 30000;
const DEFAULT_PRESENTATION_INTERVAL = PRIMARY_PRESENTATION_INTERVAL / 2;
const VARIANTS = Object.entries(AnimatedTextContentVariants).map(
  ([key, value]) => ({
    key,
    value,
  })
);
const TOTAL_PRESENTATIONS = VARIANTS.length - 1;

// #endregion

function useInfinitePresentation(): UseInfinitePresentationResult {
  const searchParams = useSearchParams();
  const router = useRouter();

  const presentationIndexQuery = searchParams.get(
    SearchParamsPresentationKeyMap.currentPresentationIndex
  );

  const presentationKey = useMemo(
    () =>
      (presentationIndexQuery ??
        'collaboration') as keyof typeof AnimatedTextContentVariants,
    [presentationIndexQuery]
  );

  const presentationIndex = useMemo(
    () => VARIANTS.findIndex(({ key }) => presentationKey === key),
    [presentationKey]
  );

  useEffect(() => {
    const presentationInterval =
      presentationIndex === 0
        ? PRIMARY_PRESENTATION_INTERVAL
        : DEFAULT_PRESENTATION_INTERVAL;

    const nextPresentationIndex =
      presentationIndex + 1 === TOTAL_PRESENTATIONS + 1
        ? 0
        : presentationIndex + 1;

    const nextPresentation = VARIANTS[nextPresentationIndex];

    const intervalId = setInterval(() => {
      const query = new URLSearchParams();
      query.set(
        SearchParamsPresentationKeyMap.currentPresentationIndex,
        String(nextPresentation.key)
      );

      router.replace(`/?${query.toString()}`, { scroll: false });
    }, presentationInterval);

    return () => {
      clearTimeout(intervalId);
    };
  }, [presentationIndex, router]);

  return {
    presentationIndex,
    presentationKey,
    totalPresentations: TOTAL_PRESENTATIONS,
  };
}

export default useInfinitePresentation;
