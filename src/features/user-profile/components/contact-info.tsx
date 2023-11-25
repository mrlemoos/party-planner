import { ComponentPropsWithoutRef, type ReactNode } from 'react'

import merge from '@root/util/merge'

/**
 * The props for the {@link ContactInfo} component.
 */
interface ContactInfoProps extends ComponentPropsWithoutRef<'span'> {
  children: ReactNode
}

/**
 * The component for the contact info.
 *
 * @props {@link ContactInfoProps}
 */
function ContactInfo({ children, className, ...props }: ContactInfoProps): JSX.Element {
  return (
    <span {...props} className={merge('font-light', className)}>
      {children}
    </span>
  )
}

export default ContactInfo
