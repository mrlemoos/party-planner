import { HTMLAttributes } from 'react'

import classes from '@root/util/classes'

type LargeProps = HTMLAttributes<HTMLDivElement>

/**
 * A non-semantic wrapper component for a large text.
 *
 * @example
 * ```tsx
 * <Large aria-hidden='true'>I am here to grab your attention 😃</Large>
 * ```
 */
function Large({ children, className, ...props }: LargeProps): JSX.Element {
  return (
    <div className={classes('text-lg font-semibold', className)} {...props}>
      {children}
    </div>
  )
}

export default Large
