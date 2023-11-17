import { type ComponentProps } from 'react'

import classes from '@root/util/classes'

import ErrorMessageIcon from './error-message-icon'

type ErrorMessageProps = ComponentProps<'span'>

/**
 * A component that renders an error message in a span.
 */
function ErrorMessage({ children, className, ...props }: ErrorMessageProps): JSX.Element {
  return (
    <span className={classes('select-none text-sm text-red-500', className)} {...props}>
      {children}
    </span>
  )
}

ErrorMessage.Icon = ErrorMessageIcon as typeof ErrorMessageIcon & { displayName: 'ErrorMessage.Icon' }
ErrorMessage.Icon.displayName = 'ErrorMessage.Icon'

export default ErrorMessage
