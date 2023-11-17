import { type HTMLAttributes } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import merge from '@root/util/merge'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

/**
 * The props for the {@link Badge} component.
 */
type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>

/**
 * A badge component.
 */
function Badge({ children, className, variant, ...props }: BadgeProps): JSX.Element {
  return (
    <div {...props} className={merge(badgeVariants({ variant }), className)}>
      {children}
    </div>
  )
}

export default Badge
