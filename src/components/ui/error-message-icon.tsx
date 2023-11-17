import { type ComponentProps } from 'react'

import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import classes from '@root/util/classes'

type ErrorMessageIconProps = ComponentProps<typeof ExclamationTriangleIcon>

/**
 * A component that renders an error message icon.
 */
function ErrorMessageIcon({ className, children, ...props }: ErrorMessageIconProps): JSX.Element {
  return (
    <ExclamationTriangleIcon className={classes('mr-1 inline-block h-4 w-4 text-red-500', className)} {...props}>
      {children}
    </ExclamationTriangleIcon>
  )
}

export default ErrorMessageIcon
