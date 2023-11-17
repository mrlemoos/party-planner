import { type HTMLAttributes } from 'react'

import merge from '@root/util/merge'

/**
 * Props for the alert title component.
 */
type AlertDescriptionProps = HTMLAttributes<HTMLDivElement>

/**
 * The alert description component is used to display a message to the user.
 *
 * @props {@link AlertDescriptionProps}
 */
function AlertDescription({ children, className, ...props }: AlertDescriptionProps): JSX.Element {
  return (
    <div className={merge('text-sm [&_p]:leading-relaxed', className)} {...props}>
      {children}
    </div>
  )
}

export default AlertDescription
