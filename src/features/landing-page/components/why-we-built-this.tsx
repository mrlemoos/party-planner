'use client'

import { type ComponentPropsWithoutRef } from 'react'

import { motion } from 'framer-motion'

import Heading from '@root/components/ui/heading'
import FontSansSerif from '@root/styles/fonts/font-serif-sans'
import merge from '@root/util/merge'

const drawLineAnimation: Pick<ComponentPropsWithoutRef<typeof motion.span>, 'initial' | 'animate' | 'style'> = {
  initial: {
    opacity: 0,
    width: 1,
  },
  animate: {
    opacity: 1,
    width: 268, // Charmingly close to the middle of the 't' in 'built'.
    transition: {
      delay: 2,
      duration: 2.5,
    },
  },
  style: {
    height: 4,
    position: 'absolute',
    bottom: -4,
    left: 0,
  },
}

function WhyWeBuiltThis(): JSX.Element {
  return (
    <Heading hierarchy='h1' className={merge(FontSansSerif.className, 'select-none text-lg')}>
      <span className='font-normal tracking-wide'>We didn&rsquo;t find the perfect planning poker app,</span>
      <br />
      <span className='relative'>
        <span className={merge(FontSansSerif.className, 'font-bold leading-8')}>so we built it.</span>
        <motion.span
          aria-hidden='true'
          className='bg-sky-500'
          initial={drawLineAnimation.initial}
          animate={drawLineAnimation.animate}
          style={drawLineAnimation.style}
        />
      </span>
    </Heading>
  )
}

export default WhyWeBuiltThis
