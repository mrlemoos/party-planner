import { type ComponentPropsWithoutRef } from 'react'

import merge from '@root/util/merge'

import Heading from './heading'

/**
 * Props for the alert title component.
 */
type AlertTitleProps = Omit<ComponentPropsWithoutRef<typeof Heading>, 'hierarchy' | 'asChild'>

/**
 * The heading component is used to display a title for the alert.
 *
 * @props {@link AlertTitleProps}
 */
function AlertTitle({ className, children, ...props }: AlertTitleProps): JSX.Element {
  return (
    <h5
      {...props}
      className={merge('mb-1 text-lg font-semibold leading-none tracking-tight text-foreground', className)}
    >
      {children}
    </h5>
  )
}

export default AlertTitle
