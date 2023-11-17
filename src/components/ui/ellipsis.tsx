import { type HTMLAttributes } from 'react'

import merge from '@root/util/merge'

/**
 * The default aria label for the ellipsis component.
 */
const DEFAULT_ARIA_LABEL = 'Loading.' as const

class EllipsisChildrenDefinedException extends Error {
  constructor() {
    super('The children prop should not be defined for the <Ellipsis /> component.')
  }
}

/**
 * The props for the ellipsis component.
 */
type EllipsisProps = HTMLAttributes<HTMLElement> & { children?: never }

/**
 * The ellipsis component is used to display a loading indicator.
 *
 * @props {@link EllipsisProps}
 */
function Ellipsis({
  children,
  className,
  'aria-label': ariaLabel = DEFAULT_ARIA_LABEL,
  ...props
}: EllipsisProps): JSX.Element {
  if (children) {
    throw new EllipsisChildrenDefinedException()
  }

  return (
    <div {...props} className={merge('flex h-screen items-center justify-center', className)} aria-label={ariaLabel}>
      <div className='grid gap-2'>
        <div className='flex animate-pulse items-center justify-center space-x-2'>
          <div className='h-2 w-2 rounded-full bg-accent' />
          <div className='h-2 w-2 rounded-full bg-accent' />
          <div className='h-2 w-2 rounded-full bg-accent' />
        </div>
      </div>
    </div>
  )
}

export default Ellipsis
