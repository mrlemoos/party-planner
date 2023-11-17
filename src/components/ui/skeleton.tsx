import { type HTMLAttributes } from 'react'

import merge from '@root/util/merge'

type SkeletonProps = HTMLAttributes<HTMLDivElement>

/**
 * The skeleton component provides a visual feedback to the user that something is loading. It is used to provide a
 * placeholder for content that is loading asynchronously.
 *
 * @props {@link SkeletonProps}
 */
function Skeleton({ children, className, ...props }: SkeletonProps): JSX.Element {
  return (
    <div className={merge('animate-pulse rounded-md bg-primary/10', className)} {...props}>
      {children}
    </div>
  )
}

export default Skeleton
