'use client'

import { Fragment, useEffect, useRef, type ComponentRef } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

import Button from '@root/components/ui/button'
import ConfettiRain from '@root/components/ui/confetti-rain'

import WaitingListFormStateQuerySearchParams from '../constants/waiting-list-form-state-query-search-params'

/**
 * The animation preset object with three states: `initial` (the state in which the component will be started up on),
 * `animate` (the state that the component will transition to when once the browser is painted) and `exit` (when the
 * component is unmounted from the screen.)
 */
const animationPreset = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
} as const

/**
 * The client component that displays the submit button of the waiting list enrollment form. This component has two
 * states, one for when the user has not been enrolled to the waiting list yet, and one for when the user has been
 * enrolled to the waiting list.
 *
 * When the user enrolls to the waiting list, the component fades out and the {@link ConfettiRain | confetti animation}
 * is played. The component is then unmounted from the DOM.
 */
function EnrollWaitingListSubmitButton(): JSX.Element | null {
  const searchParams = useSearchParams()

  const confetti = useRef<ComponentRef<typeof ConfettiRain>>(null)

  const isEnrolled = searchParams.has(WaitingListFormStateQuerySearchParams.success)

  useEffect(() => {
    if (isEnrolled) {
      confetti.current?.animateConfetti()
    }
  }, [isEnrolled])

  const isButtonRendered = !isEnrolled

  return (
    <Fragment>
      {isButtonRendered && (
        <AnimatePresence>
          <Button asChild={true}>
            <motion.button
              type='submit'
              initial={animationPreset.initial}
              animate={animationPreset.animate}
              exit={animationPreset.exit}
            >
              Sign me up!
            </motion.button>
          </Button>
        </AnimatePresence>
      )}
      <ConfettiRain pieces={1000} ref={confetti} />
    </Fragment>
  )
}

export default EnrollWaitingListSubmitButton
