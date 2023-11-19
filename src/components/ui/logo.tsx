'use client'

import { useCallback, useEffect, useState } from 'react'

import { motion, type EventInfo } from 'framer-motion'

import FontSansSerif from '@root/styles/fonts/font-serif-sans'
import merge from '@root/util/merge'

/**
 * The animation that is applied to the lettering of the logo.
 */
const expandAnimation = {
  initial: {
    width: 0,
    opacity: 0,
    transition: {
      delay: 4,
    },
  },
  animate: {
    width: 'auto',
    opacity: 1,
  },
}

/**
 * The animation that is applied to the emoji of the logo.
 */
const fadeInUpAnimation = {
  initial: {
    opacity: 0,
    y: 20,
    transition: {
      delay: 3,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
    },
  },
}

interface LogoProps {
  /**
   * The class name that is merged with the default class name at the root element.
   */
  className: string
}

/**
 * The logo of the application.
 *
 * @props {@link LogoProps}
 */
function Logo({ className }: LogoProps): JSX.Element {
  const [hasUserHovered, setUserHasHovered] = useState(true)

  const handleHoverStart = useCallback(
    (/* DOM native */ _mouseEvent: MouseEvent, _info: EventInfo) => {
      if (hasUserHovered) {
        return
      }
      setUserHasHovered(true)
    },
    [hasUserHovered],
  )

  useEffect(() => {
    if (!hasUserHovered) {
      return
    }

    const timeout = setTimeout(() => {
      setUserHasHovered(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [hasUserHovered])

  const letteringAnimation = hasUserHovered ? expandAnimation.animate : expandAnimation.initial
  const emojiAnimation = hasUserHovered ? fadeInUpAnimation.animate : fadeInUpAnimation.initial

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      aria-label='P&P'
      className={merge('font-black tracking-wide', className, FontSansSerif.className)}
    >
      <motion.span className='flex items-center'>
        <span>P</span>
        <motion.span animate={letteringAnimation}>lanning</motion.span>
        <span className='text-xl'>&</span>
        <span>P</span>
        <motion.span animate={letteringAnimation}>arty</motion.span>
        <motion.span animate={emojiAnimation} className='text-xl'>
          &nbsp;🎉
        </motion.span>
      </motion.span>
    </motion.div>
  )
}

export default Logo
