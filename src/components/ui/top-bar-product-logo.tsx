'use client'

import { motion, type TargetAndTransition } from 'framer-motion'
import Link from 'next/link'

import merge from '@root/util/merge'
import toRem from '@root/util/to-rem'

import Logo from './logo'

/**
 * The object representing the keyframes for the product logo's animation.
 */
const KEYFRAMES = {
  productLogo: {
    whileHover: {
      width: toRem(40),

      transition: {
        duration: 0.5,
        type: 'spring',
      },
    },
  } as TargetAndTransition,
} as const

/**
 * The hyper-reference to the homepage.
 */
const HOMEPAGE_HREF = '/' as const

/**
 * The framer-motion-adapted {@link Logo} component.
 * 
 * @see {@link https://www.framer.com/api/motion/}
 * @see {@link Logo}
 * @see {@link motion}
 */
const AnimatedLogo = motion(Logo)

/**
 * The props for the {@link TopBarProductLogo} component.
 */
interface TopBarProductLogoProps {
  className?: string
}

/**
 * The client component that represents the (animated) product logo in the top
 * bar with the link to the homepage.
 *
 * @props {@link TopBarProductLogoProps}
 */
function TopBarProductLogo({ className }: TopBarProductLogoProps): JSX.Element {
  return (
    <Link href={HOMEPAGE_HREF} target='_self' className={merge(className)}>
      <AnimatedLogo whileHover={KEYFRAMES.productLogo} />
    </Link>
  )
}

export default TopBarProductLogo
