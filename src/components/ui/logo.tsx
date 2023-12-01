'use client'

import { AnimatePresence, motion, type TargetAndTransition } from 'framer-motion'

import fadeIn from '@root/animation/variants/fade-in'
import fadeInOut from '@root/animation/variants/fade-in-out'
import fadeInOutLeft from '@root/animation/variants/fade-in-out-left'
import FontLogo from '@root/styles/fonts/font-logo'
import combineShallow from '@root/util/combine-shallow'
import merge from '@root/util/merge'

const planningWordExpandAnimation = {
  initial: combineShallow<TargetAndTransition>({
    x: -20,
  }),
  animate: combineShallow<TargetAndTransition>(fadeIn.animate, {
    x: 0,
    transition: {
      delay: 0.5,
    },
  }),
} as const

const emojiAnimation = {
  initial: fadeInOut.initial,
  animate: {
    ...fadeInOut.animate,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
  exit: fadeInOut.exit,
} as const

interface LogoProps {
  /**
   * The class name that is merged with the default class name at the root element.
   */
  className?: string
}

/**
 * The logo of the application.
 *
 * @props {@link LogoProps}
 */
function Logo({ className }: LogoProps): JSX.Element {
  return (
    <div className='flex items-center gap-1'>
      <AnimatePresence>
        <div className={merge('flex items-center gap-4 text-lg text-foreground', className)} aria-label='Planria'>
          <motion.div
            className={merge('text-medium text', FontLogo.className)}
            initial={fadeInOutLeft.initial}
            animate={fadeInOutLeft.animate}
            exit={fadeInOutLeft.exit}
          >
            <span>P</span>
            <motion.span initial={planningWordExpandAnimation.initial} animate={planningWordExpandAnimation.animate}>
              lanria
            </motion.span>
            <motion.span
              initial={emojiAnimation.initial}
              animate={emojiAnimation.animate}
              exit={emojiAnimation.exit}
              className='mx-2'
            >
              🎉
            </motion.span>
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  )
}

export default Logo
