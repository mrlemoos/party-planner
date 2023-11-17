'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'

import { Indicator as PrimitiveIndicator, Root as PrimitiveRoot } from '@radix-ui/react-progress'

import merge from '@root/util/merge'

/**
 * Element types for the progress bar ref.
 *
 * @see {@link ElementRef}
 */
type ProgressRef = ElementRef<typeof PrimitiveRoot>
/**
 * Props for the progress bar.
 */
interface ProgressProps extends Omit<ComponentPropsWithoutRef<typeof PrimitiveRoot>, 'value'> {
  /**
   * The value of the progress bar.
   *
   * @default 0
   */
  value?: number
}
/**
 * The component that renders a bar which is filled by a percentage provided by the {@link ProgressProps.value | value}
 * property.
 *
 * @props {@link ProgressProps}
 * @ref {@link ProgressRef}
 */
const Progress = forwardRef<ProgressRef, ProgressProps>(({ className, value = 0, ...props }, ref) => (
  <PrimitiveRoot
    ref={ref}
    className={merge('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
    {...props}
  >
    <PrimitiveIndicator
      className='h-full w-full flex-1 bg-primary transition-all'
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
  </PrimitiveRoot>
))

Progress.displayName = 'Progress'

export default Progress
