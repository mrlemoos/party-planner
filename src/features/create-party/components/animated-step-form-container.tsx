'use client'

import { type HTMLAttributes } from 'react'

import { motion } from 'framer-motion'

import fadeInOutLeft from '@root/animation/variants/fade-in-out-left'
import fadeInOutRight from '@root/animation/variants/fade-in-out-right'
import merge from '@root/util/merge'

/**
 * The (general) HTML element attributes.
 */
type HTMLElementAttributes = HTMLAttributes<HTMLElement>
/**
 * The required and picked {@link HTMLElementAttributes | HTML element attributes}.
 */
type RequiredPickedHTMLElementAttributes = Required<Pick<HTMLElementAttributes, 'children'>>
/**
 * The partial {@link HTMLElementAttributes | HTML element attributes}.
 */
type PartialPickedHTMLElementAttributes = Partial<Pick<HTMLElementAttributes, 'className'>>

/**
 * The props for the {@link AnimatedStepFormContainer} component.
 */
type AnimatedStepFormContainerProps = RequiredPickedHTMLElementAttributes & PartialPickedHTMLElementAttributes

/**
 * The component that composes the form container that animates the steps of the party creation process.
 *
 * @props {@link AnimatedStepFormContainerProps}
 */
function AnimatedStepFormContainer({ children, className }: AnimatedStepFormContainerProps): JSX.Element {
  return (
    <motion.section
      className={merge('my-8 w-full sm:max-w-lg', className)}
      initial={fadeInOutLeft.initial}
      animate={fadeInOutLeft.animate}
      exit={fadeInOutRight.exit}
    >
      {children}
    </motion.section>
  )
}

export default AnimatedStepFormContainer
