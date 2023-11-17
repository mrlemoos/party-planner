'use client'

import { type ReactNode } from 'react'

import { motion } from 'framer-motion'

import merge from '@root/util/merge'

interface AnimatedWrapperProps {
  children: ReactNode
  className?: string
}

const scaleInUpAnimation = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      duration: 0.5,
    },
  },
}

/**
 * The animated wrapper that wraps the content of the page.
 *
 * @props {@link AnimatedWrapperProps}
 */
function AnimatedWrapper({ children, className }: AnimatedWrapperProps): JSX.Element {
  return (
    <motion.div className={merge(className)} initial={scaleInUpAnimation.initial} animate={scaleInUpAnimation.animate}>
      {children}
    </motion.div>
  )
}

export default AnimatedWrapper
