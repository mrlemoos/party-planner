import { memo, type JSX, type Key, type HTMLAttributes } from 'react';

import {
  motion,
  type MotionStyle,
  type TargetAndTransition,
  type Variant,
} from 'framer-motion';

// #region Interfaces & Types

interface GetWordAnimationKeyFunction {
  (word: string): Key;
}

type PickedHTMLDivAttributes = Pick<HTMLAttributes<HTMLElement>, 'className'>;

type StyleProp = Omit<MotionStyle, 'position' | 'height' | 'width'>;

interface AnimatedTextProps extends PickedHTMLDivAttributes {
  children: string;
  style?: StyleProp;

  getWordAnimationKey?: GetWordAnimationKeyFunction;
}

type MotionVariantsProp = {
  [$V in 'hidden' | 'visible']: Variant;
};

type MotionVariantTransition = NonNullable<TargetAndTransition['transition']>;

// #endregion

// #region Constants & Utilities

const staggerChildren = 0.12;
const delayChildrenBasis = 0.04;

const containerVariants: MotionVariantsProp = {
  hidden: {
    opacity: 0,
  },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: delayChildrenBasis * i,
    },
  }),
};

const variantStage: {
  [$V in keyof MotionVariantsProp]: $V;
} = {
  hidden: 'hidden',
  visible: 'visible',
};

const wordStiffness = 100;
const wordDamping = 12;
const wordOffsetX = 20;
const wordAnimationType = 'spring' as const;

const wordTransitionConfiguration: MotionVariantTransition = {
  transition: {
    type: wordAnimationType,
    damping: wordDamping,
    stiffness: wordStiffness,
  },
};

const wordVariants: MotionVariantsProp = {
  visible: {
    opacity: 1,
    x: 0,
    transition: wordTransitionConfiguration,
  },
  hidden: {
    opacity: 0,
    x: wordOffsetX,
    transition: wordTransitionConfiguration,
  },
};

// #endregion

function AnimatedText$({
  children,
  getWordAnimationKey,
  className,
  style,
}: AnimatedTextProps): JSX.Element {
  const words = children.split(' ');

  return (
    <motion.span
      variants={containerVariants}
      initial={variantStage.hidden}
      animate={variantStage.visible}
      className={className}
      style={style}
    >
      {words.map((word) => {
        const key =
          typeof getWordAnimationKey === 'function'
            ? getWordAnimationKey(word)
            : word;

        return (
          <motion.span
            className="text-6xl font-bold"
            key={key}
            variants={wordVariants}
            initial={variantStage.hidden}
            animate={variantStage.visible}
          >
            {word}&nbsp;
          </motion.span>
        );
      })}
    </motion.span>
  );
}

const AnimatedText = memo(AnimatedText$);

export default AnimatedText;
