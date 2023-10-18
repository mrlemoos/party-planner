'use client';

import { type JSX } from 'react';

import { AnimatePresence } from 'framer-motion';

import AnimatedText from '@root/components/atoms/AnimatedText';
import SizedBox from '@root/components/atoms/SizedBox';
import Counter from '@root/components/atoms/Counter';

import AnimatedTextContentVariants from '../../constants/AnimatedTextContentVariants';
import PresentationColors from '../../constants/PresentationColors';
import useInfinitePresentation from '../../hooks/useInfinitePresentation';

import { headingTextRootClassName } from './Callout.css';

export default function Callout(): JSX.Element {
  const { presentationIndex, presentationKey, totalPresentations } =
    useInfinitePresentation();

  const animatedTextContent = AnimatedTextContentVariants[presentationKey];
  const color = PresentationColors[presentationKey];

  return (
    <AnimatePresence>
      <h1 className={headingTextRootClassName}>
        Want to plan your sprint? So let&rsquo;s
        <SizedBox height={4} />
        <AnimatedText style={{ color }}>{animatedTextContent}</AnimatedText>
        <Counter
          current={presentationIndex + 1}
          total={totalPresentations + 1}
        />
      </h1>
    </AnimatePresence>
  );
}
