'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { Root as PrimitiveRoot } from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import classes from '@root/util/classes'

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70')

type $$PrimitiveRootProps = ComponentPropsWithoutRef<typeof PrimitiveRoot>
type $$LabelVariantsProps = VariantProps<typeof labelVariants>

interface LabelProps extends $$LabelVariantsProps, $$PrimitiveRootProps {
  /**
   * The children which is required to render the elements of the `Label` component.
   */
  children: ReactNode
}

/**
 * The `Label` component is an accessible label component that is used to label other components such as `Input` and
 * `Select`.
 *
 * This component has a `'use client'` directive since it internally uses the `@radix-ui/react-label` primitive
 * component and forwards the ref to it.
 */
const Label = forwardRef<HTMLLabelElement, LabelProps>(({ children, className, ...props }, ref) => (
  <PrimitiveRoot className={classes(labelVariants(), className)} ref={ref} {...props}>
    {children}
  </PrimitiveRoot>
))
Label.displayName = 'Label'

export default Label
