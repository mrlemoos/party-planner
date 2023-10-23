'use client';

import { useMemo, type JSX } from 'react';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import cls from 'classnames';

import PresentationColors from '../../constants/PresentationColors';
import SearchParamsPresentationKeyMap from '../../constants/SearchParamsPresentationKeyMap';
import CollaborationBanner from '../molecules/CollaborationBanner';
import PointTicketsBanner from '../molecules/PointTicketsBanner';

import { concept } from './PrincipleBanner.css';

const BANNER_COMPONENT_BY_PRESENTATION_INDEX = {
  collaboration: CollaborationBanner,
  points: PointTicketsBanner,
  planning: null,
  fun: null,
} as const;

function PrincipleBanner(): JSX.Element {
  const searchParams = useSearchParams();
  const presentationIndexQuery = searchParams.get(
    SearchParamsPresentationKeyMap.currentPresentationIndex,
  );
  const presentationKey = (presentationIndexQuery ??
    'collaboration') as keyof typeof BANNER_COMPONENT_BY_PRESENTATION_INDEX;

  const Banner = BANNER_COMPONENT_BY_PRESENTATION_INDEX[presentationKey];
  const backgroundColor = PresentationColors[presentationKey];

  return (
    <motion.div
      style={{ backgroundColor }}
      className={cls('animate-scale-in-content text-white', concept)}
    >
      {!!Banner && <Banner />}
    </motion.div>
  );
}

export default PrincipleBanner;
