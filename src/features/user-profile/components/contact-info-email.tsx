import { type ReactNode } from 'react'

import { CheckIcon, EnvelopeOpenIcon } from '@radix-ui/react-icons'

import ContactInfo from './contact-info'
import ContactInfoLine from './contact-info-line'

interface ContactInfoEmailProps {
  /**
   * The email address to display.
   */
  children: ReactNode
  /**
   * Boolean to indicate whether or not the email address is verified, and therefore, display a visual feedback to the
   * user.
   */
  isVerified: boolean
}

/**
 * The contact info that is responsible for displaying the user's email address.
 *
 * @props {@link ContactInfoEmailProps}
 */
function ContactInfoEmail({ children, isVerified }: ContactInfoEmailProps): JSX.Element | null {
  if (!children) {
    return null
  }

  return (
    <ContactInfoLine>
      <EnvelopeOpenIcon aria-hidden='true' />
      <ContactInfo>{children}</ContactInfo>
      {isVerified && (
        <div className='flex items-center gap-0' title='Verified' aria-label='Your email address is verified'>
          <CheckIcon className='h-6 w-6 text-green-500' aria-hidden='true' />
        </div>
      )}
    </ContactInfoLine>
  )
}

export default ContactInfoEmail
