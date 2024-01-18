'use client'

import { ComponentPropsWithoutRef, type HTMLAttributes, type JSX } from 'react'

import { motion } from 'framer-motion'

import merge from '@root/util/merge'
import fadeInOutLeft from '@root/animation/variants/fade-in-out-left'
import fadeInOutRight from '@root/animation/variants/fade-in-out-right'

import StepperProgressIndicator from './stepper-progress-indicator'

type StepperProgressIndicatorProps = ComponentPropsWithoutRef<typeof StepperProgressIndicator>

type PickedStepperProgressIndicatorProps = Pick<StepperProgressIndicatorProps, 'currentStepKey'>

type HTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>

type PickedHTMLDivElementAttributes = Pick<HTMLDivElementAttributes, 'className' | 'children'>

/**
 * The interface for the props of the {@link Stepper} component.
 */
interface StepperProps extends PickedHTMLDivElementAttributes, PickedStepperProgressIndicatorProps {}

/**
 * The component that composes the stepper that animates the steps.
 *
 * @props {@link StepperProps}
 */
function Stepper({ children, className, currentStepKey }: StepperProps): JSX.Element {
  return (
    <motion.section
      className={merge('my-1 w-full sm:max-w-lg', className)}
      initial={fadeInOutLeft.initial}
      animate={fadeInOutLeft.animate}
      exit={fadeInOutRight.exit}
    >
      <StepperProgressIndicator currentStepKey={currentStepKey}>{children}</StepperProgressIndicator>
    </motion.section>
  )
}

export default Stepper
