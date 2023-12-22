'use client'

import { Children, Fragment, memo, useMemo, type ReactElement, type ReactNode } from 'react'

import { motion } from 'framer-motion'

import isValidRenderElement from '@root/util/is-valid-render-element'

import CreatePartyStep from '../enums/create-party-step'

import Progress from '@root/components/ui/progress'
import merge from '@root/util/merge'
import PartySetupStepTitle from './party-setup-step-title'

/**
 * Compares the child with the current step key to identify the current step. The given {@link currentStepKey} is
 * compared with the {@link ReactElement.key | key} or the {@link ValidRenderElementProps.children | children} of the
 * given {@link child}, returning true if either of them matches.
 */
function isCurrentStep(
  child: unknown,
  currentStepKey: CreatePartyStep,
): child is ReactElement<ValidRenderElementProps> {
  return (
    isValidRenderElement<ValidRenderElementProps>(child) &&
    (String(child.props.children) === currentStepKey || child.key === currentStepKey)
  )
}

/**
 * Loops through the {@link children} (as an {@link Children.toArray | array}) to find the current step.
 *
 * @see {@link isCurrentStep}
 */
function findCurrentStep(
  childrenArray: ReturnType<typeof Children.toArray>,
  currentStepKey: CreatePartyStep,
): ReactNode {
  return childrenArray.find((element) => isCurrentStep(element, currentStepKey))
}

/**
 * The props type of the valid render element. This is used to compare the children of each step with the current step
 * key to identify the current step.
 */
type ValidRenderElementProps = { children: ReactNode }

/**
 * The props for the {@link PartySetupStepIndicator} component.
 */
interface PartySetupStepIndicatorProps {
  /**
   * The {@link ReactNode children} that correspond to the step titles.
   */
  children: ReactNode
  /**
   * The string ({@link CreatePartyStep | key}) that indicates which step is the current one.
   */
  currentStepKey: CreatePartyStep
}

/**
 * The component that composes the step indicator of the party setup.
 *
 * @props {@link PartySetupStepIndicatorProps}
 */
const PartySetupStepIndicator = memo<PartySetupStepIndicatorProps>(({ children, currentStepKey }) => {
  const childrenArray = Children.toArray(children)

  /**
   * The {@link ReactElement | element} that corresponds to the current step element provided via the {@link children}.
   */
  const currentStepElement = useMemo(
    () => childrenArray.find((element) => findCurrentStep(childrenArray, currentStepKey) === element),
    [childrenArray, currentStepKey],
  )

  /**
   * The index of the current step in the {@link children} array.
   */
  const currentStepIndex = useMemo(
    () => (currentStepElement ? childrenArray.indexOf(currentStepElement) : 0),
    [childrenArray, currentStepElement],
  )

  /**
   * Calculates the completion percentage of the party setup based on the current step index and the total number of
   * steps.
   */
  const computedCompletionPercentage = useMemo(() => {
    return (Math.max(currentStepIndex + 1, 1) / childrenArray.length) * 100
  }, [childrenArray.length, currentStepIndex])

  return (
    <section>
      <motion.ul
        layout={true}
        className='flex flex-row gap-2 [&>li]:m-0 [&>li]:list-none [&>li]:last:after:content-[""]'
      >
        {Children.map(children, (child, index) => {
          const isFocused =
            isValidRenderElement<ValidRenderElementProps>(child) &&
            // Overriding the type of the child to be able to access its props
            child.props.children === currentStepKey

          const isLast = index === Children.count(children) - 1

          return (
            <Fragment key={String(child)}>
              <li className='flex items-center gap-1'>
                <PartySetupStepTitle isInFormFocus={isFocused}>{child}</PartySetupStepTitle>
                {!isLast && (
                  <div
                    className={merge(
                      'ml-1 flex h-1 w-1 items-center justify-center rounded-full',
                      isFocused ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-gray-500',
                    )}
                  />
                )}
              </li>
            </Fragment>
          )
        })}
      </motion.ul>
      <motion.div layout={true}>
        <Progress value={computedCompletionPercentage} />
      </motion.div>
    </section>
  )
})
PartySetupStepIndicator.displayName = 'PartySetupStepIndicator'

export default PartySetupStepIndicator
