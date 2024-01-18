'use client'

import { Children, Fragment, useMemo, type JSX, type ReactElement, type ReactNode } from 'react'

import { motion } from 'framer-motion'

import isValidRenderElement from '@root/util/is-valid-render-element'

import Progress from './progress'
import StepperProgressIndicatorItem from './stepper-progress-indicator-item'

/**
 * This function compares the given {@link child} with the {@link currentStepKey} to identify the current step. This is
 * possible by putting side-to-side the key that the {@link currentStepKey} represents and the actual Virtual DOM
 * equivalent key of the given {@link child}.
 *
 * Please notice that the generic {@link T} represents the strict version of the string which is the key of the element
 * wanted to be compared. Meanwhile, the given generic {@link P} type is the interface-like object representation of the
 * props of the given {@link child} if it complies with the {@link ReactElement} interface.
 *
 * @see {@link isValidRenderElement}
 */
function isCurrentStep<T extends string, P extends { children: ReactNode }>(
  child: unknown,
  currentStepKey: T,
): child is ReactElement<P> {
  return (
    isValidRenderElement<P>(child) &&
    !!child?.props?.children &&
    (String(child.props.children) === currentStepKey || child.key === currentStepKey)
  )
}

/**
 * This function loops through the {@link children} (as an {@link Children.toArray | array}) to find the current step.
 *
 * @see {@link isCurrentStep}
 */
function findCurrentStep<T extends string, P extends { children: ReactNode }>(
  childrenArray: ReturnType<typeof Children.toArray>,
  currentStepKey: T,
): ReactNode {
  return childrenArray.find((element) => isCurrentStep<T, P>(element, currentStepKey))
}

interface StepperProgressIndicatorProps<T extends string> {
  /**
   * The {@link ReactNode | children} that correspond to the steps of the stepper.
   */
  children: ReactNode
  /**
   * The string that indicates which step is the current one.
   */
  currentStepKey: T
}

/**
 * This component is responsible for rendering the progress indicator of the stepper by defining the label of the steps
 * and a progress bar updated according to the given {@link StepperProgressIndicatorProps.currentStepKey | current key}
 * in comparison to the virtual DOM key of each of the {@link StepperProgressIndicatorProps.children | children}.
 *
 * @props {@link StepperProgressIndicatorProps}
 */
const StepperProgressIndicator = <T extends string>({
  children,
  currentStepKey,
}: StepperProgressIndicatorProps<T>): JSX.Element => {
  const childrenArray = Children.toArray(children)
  const childrenLength = childrenArray.length

  const computedCurrentStepChildElement = useMemo(() => {
    // NOTE: We use the useMemo() hook because we're looping through an array of multiple React elements which are quite
    // complex objects and we don't want to waste resources by doing this computation on every render.
    const foundElement = childrenArray.find(
      (element) => findCurrentStep(childrenArray, currentStepKey) === element,
      [childrenArray, currentStepKey],
    )
    // NOTE: The computation above returns a ReactNode which is the equivalent of the Virtual DOM element.

    return foundElement
  }, [childrenArray, currentStepKey])

  const computedCurrentStepChildIndex = useMemo(() => {
    // NOTE: We use the useMemo() hook because we're looping through an array of multiple React elements which are quite
    // complex objects and we don't want to waste resources by doing this computation on every render.
    const computedCurrentElementByIndex = computedCurrentStepChildElement
      ? childrenArray.indexOf(computedCurrentStepChildElement)
      : 0 // We default to 0 because if no step is the current one, then we'll return the first step :)

    return computedCurrentElementByIndex
  }, [childrenArray, computedCurrentStepChildElement])

  const computedCompletionPercentage = useMemo(() => {
    const computedCurrentStepChildIndexHumanLanguagePositionOrOne = Math.max(computedCurrentStepChildIndex + 1, 1)
    // NOTE: We use the useMemo() hook because we mention the childrenArray and the currentStepIndex as dependencies -
    // as both of these values are used in the computation - and we don't want to waste resources by doing this
    // computation on every render as they refer to an array of complex React element objects.
    return (computedCurrentStepChildIndexHumanLanguagePositionOrOne / childrenLength) * 100
  }, [childrenLength, computedCurrentStepChildIndex])

  return (
    <Fragment>
      <motion.ul
        layout={true}
        className='mb-1 flex flex-row gap-2 [&>]:last:after:content-[""] [&>li]:m-0 [&>li]:list-none'
      >
        {Children.map(children, (child, index) => {
          const isFocused = isCurrentStep(child, currentStepKey)
          const isLast = index === childrenLength - 1
          const virtualKey =
            typeof child === 'string'
              ? child
              : String((child as ReactElement<{ children?: ReactNode }> | undefined)?.props?.children)

          return (
            <StepperProgressIndicatorItem key={virtualKey} isFocused={isFocused} isLast={isLast}>
              {child}
            </StepperProgressIndicatorItem>
          )
        })}
      </motion.ul>
      <motion.div layout={true}>
        <Progress value={computedCompletionPercentage} />
      </motion.div>
    </Fragment>
  )
}

StepperProgressIndicator.displayName = 'Stepper.ProgressIndicator'

export default StepperProgressIndicator
