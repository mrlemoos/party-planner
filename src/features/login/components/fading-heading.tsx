'use client'

import { useEffect, useId, useMemo, type ComponentProps } from 'react'

import { motion } from 'framer-motion'

import Heading from '@root/components/ui/heading'
import merge from '@root/util/merge'

type $$MotionVariantsProp = ComponentProps<typeof motion.div>['variants']

/**
 * The interval to wait before switching to the next presentation.
 */
const INITIAL_INTERVAL = 0.5 as const
/**
 * The animation duration to apply to the text that renders after the "fun" text in seconds. The value in seconds is
 * `0.5`, *a.k.a.* `500` milliseconds or half a second.
 */
const DURATION = 0.5 as const
/**
 * The key to use to store the value that indicates whether the fading heading animation has been shown. This must be
 * once generated and stored in the `sessionStorage` object to prevent the animation from showing again.
 *
 * The hash is created on the server-side to prevent the client-side from generating a different hash via the
 * `node:crypto` module.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 */
const HAS_SHOWN_FADING_HEADING_ANIMATION_STORAGE_KEY = 'has_shown_fading_heading_animation' as const
/**
 * The value to use to store the value that indicates whether the fading heading animation has been shown.
 */
const HAS_SHOWN_FADING_HEADING_ANIMATION_STORAGE_VALUE = 'true' as const
/**
 * The variants applied to the "fun" text that renders as the first text and/or after the "fun" text in the loop.
 */
const collaborationAnimationVariants: $$MotionVariantsProp = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: INITIAL_INTERVAL,
      duration: DURATION,
    },
  },
}
/**
 * The variants applied to the "planning" text that renders after the "collaboration" text.
 */
const planningAnimationVariants: $$MotionVariantsProp = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: INITIAL_INTERVAL * 3,
      duration: DURATION,
    },
  },
}
/**
 * The variants applied to the "points" text that renders after the "planning" text.
 */
const pointsAnimationVariants: $$MotionVariantsProp = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATION,
      delay: INITIAL_INTERVAL * 6,
    },
  },
}
/**
 * The variants applied to the "fun" text that renders after the "points" text.
 */
const funAnimationVariants: $$MotionVariantsProp = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATION,
      delay: INITIAL_INTERVAL * 9,
    },
  },
}
/**
 * The return type of the {@link createAnimationVariants} function.
 */
type $$CreateAnimationVariantsReturnType = {
  [K in
    | 'collaborationAnimationSet'
    | 'planningAnimationSet'
    | 'pointsAnimationSet'
    | 'funAnimationSet']?: $$MotionVariantsProp
}
/**
 * Creates the {@link https://www.framer.com/api/motion/animation/#variants | variants} for the animation and returns
 * the object to use as the `variants` prop for the {@link motion | `motion`} pseudo-elements. This function checks
 * whether the {@link isAnimationLocked | animation is locked} from showing again, and if so, it returns an empty
 * object.
 *
 * @see https://www.framer.com/api/motion/animation/#variants
 * @see https://www.framer.com/api/motion/animation/#animate
 * @see https://www.framer.com/api/motion/animation/#transition
 *
 * @see {@link isAnimationLocked}
 * @see {@link collaborationAnimationVariants}
 * @see {@link planningAnimationVariants}
 * @see {@link pointsAnimationVariants}
 * @see {@link funAnimationVariants}
 */
function createAnimationVariants(): $$CreateAnimationVariantsReturnType {
  if (isAnimationLocked()) {
    return {}
  }

  return {
    collaborationAnimationSet: collaborationAnimationVariants,
    planningAnimationSet: planningAnimationVariants,
    pointsAnimationSet: pointsAnimationVariants,
    funAnimationSet: funAnimationVariants,
  }
}
/**
 * The `&` character that renders between the different colored texts.
 */
function CommercialAnd(): JSX.Element {
  return <span className='font-light text-gray-500'>&</span>
}
/**
 * Checks whether the animation is locked from showing again.
 */
function isAnimationLocked(): boolean {
  const hasShownFadingHeadingAnimation =
    sessionStorage.getItem(HAS_SHOWN_FADING_HEADING_ANIMATION_STORAGE_KEY)?.toLowerCase() ===
    HAS_SHOWN_FADING_HEADING_ANIMATION_STORAGE_VALUE

  return hasShownFadingHeadingAnimation
}
/**
 * The timeout that locks the animation from showing again.
 *
 * @param after The delay to lock the animation in milliseconds. The default value is `0.5 * 9 * 1000` which is
 *                    `9` times the {@link INITIAL_INTERVAL} constant in milliseconds.
 */
function lockAnimation(after = INITIAL_INTERVAL * 9 * 1000): NodeJS.Timeout | undefined {
  const timeout = isAnimationLocked()
    ? undefined
    : /* eslint-disable indent */
      // The rule above had to be disabled because the `eslint` parser does not support the `indent` rule with the this
      // syntax for some reason.
      setTimeout(() => {
        sessionStorage &&
          sessionStorage.setItem(
            HAS_SHOWN_FADING_HEADING_ANIMATION_STORAGE_KEY,
            HAS_SHOWN_FADING_HEADING_ANIMATION_STORAGE_VALUE,
          )
      }, after)

  /* eslint-enable indent */
  return timeout
}

/**
 * The heading that scrolls through the different presentations. This is a `client-side` component.
 */
function FadingHeading(): JSX.Element {
  const headingAccessibilityLabelId = useId()

  const { collaborationAnimationSet, funAnimationSet, planningAnimationSet, pointsAnimationSet } = useMemo(
    () => createAnimationVariants(),
    [],
  )

  useEffect(() => {
    const timeout = lockAnimation()

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <div className='hidden flex-col gap-4 md:flex'>
      <Heading hierarchy='h1' className='mb-8 font-normal' aria-labelledby={headingAccessibilityLabelId}>
        Let&apos;s&nbsp;
        <motion.span {...collaborationAnimationSet} className={merge('font-bold text-collaboration')}>
          Collaborate
        </motion.span>
        <motion.span {...planningAnimationSet} className={merge('font-bold text-planning')}>
          <CommercialAnd />
          Plan
        </motion.span>
        <motion.span {...pointsAnimationSet} className={merge('font-bold text-points')}>
          <CommercialAnd />
          Point Stories
        </motion.span>
        <motion.span {...funAnimationSet} className={merge('font-bold text-fun')}>
          <CommercialAnd />
          Have <u>Fun</u>
        </motion.span>
      </Heading>
      <span className='invisible fixed' id={headingAccessibilityLabelId}>
        Let&apos;s Collaborate, Plan, Point stories, and Have Fun
      </span>
    </div>
  )
}

export default FadingHeading
