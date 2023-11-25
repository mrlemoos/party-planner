import { type ReactNode } from 'react'

import { MobileIcon } from '@radix-ui/react-icons'

import ContactInfo from './contact-info'
import ContactInfoLine from './contact-info-line'

interface ContactInfoPhoneProps {
  /**
   * The phone number to display.
   */
  children?: ReactNode
}

/**
 * The contact info that is responsible for displaying the user's phone number.
 *
 * @props {@link ContactInfoPhoneProps}
 */
function ContactInfoPhone({ children }: ContactInfoPhoneProps): JSX.Element | null {
  if (!children) {
    return null
  }

  return (
    <ContactInfoLine>
      <MobileIcon aria-hidden='true' />
      <ContactInfo>{children}</ContactInfo>
    </ContactInfoLine>
  )
}

export default ContactInfoPhone
