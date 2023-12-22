'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'

import { Indicator as PrimitiveIndicator, Root as PrimitiveRoot } from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import merge from '@root/util/merge'

/**
 * The props for the {@link PrimitiveRoot} from Radix UI.
 */
type CheckboxPrimitiveRootProps = ComponentPropsWithoutRef<typeof PrimitiveRoot>

/**
 * The element ref for the {@link PrimitiveRoot} from Radix UI.
 */
type CheckboxPrimitiveRootRef = ElementRef<typeof PrimitiveRoot>

/**
 * The {@link Checkbox} component's element reference which is forward down the virtual DOM.
 */
type CheckboxElementRef = CheckboxPrimitiveRootRef

/**
 * The props for the {@link Checkbox} component.
 */
interface CheckboxProps extends CheckboxPrimitiveRootProps {
  /**
   * @ignore
   */
  children?: never
}

const Checkbox = forwardRef<CheckboxElementRef, CheckboxProps>(function ({ className, ...props }, ref) {
  return (
    <PrimitiveRoot
      ref={ref}
      className={merge(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className,
      )}
      {...props}
    >
      <PrimitiveIndicator className={merge('flex items-center justify-center text-current')}>
        <CheckIcon className='h-4 w-4' />
      </PrimitiveIndicator>
    </PrimitiveRoot>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
