'use client'

import { CheckIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

import Card from '@root/components/ui/card'

const motionFrame = {
  initial: {
    opacity: 0,
    y: 1000,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
}

/**
 * The component that renders the animated card header.
 */
function AnimatedCardHeader(): JSX.Element {
  return (
    <Card.Header>
      <motion.div initial={motionFrame.initial} animate={motionFrame.animate}>
        <CheckIcon className='text-green-500' />
      </motion.div>
      <Card.Title>Let&apos;s create your party 🎉</Card.Title>
    </Card.Header>
  )
}

export default AnimatedCardHeader
