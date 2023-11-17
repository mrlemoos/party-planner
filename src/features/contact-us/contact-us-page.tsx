import { Fragment } from 'react'

import ComposedInput from '@root/components/ui/composed-input'
import ComposedTextarea from '@root/components/ui/composed-textarea'
import Label from '@root/components/ui/label'
import QuickFormCard from '@root/components/ui/quick-form-card'

import SubmitMessageButton from './components/submit-message-button'
import SubmitSuccessPanel from './components/submit-success-panel'
import ContactUsFormFieldNames from './constants/contact-us-form-field-names'
import sendMessageAction from './server-actions/send-message-action'

interface ContactUsPageProps {
  /**
   * The default value for the first name input. It is defined when the user is logged in.
   */
  defaultFirstNameValue?: string
  /**
   * The default value for the last name input. It is defined when the user is logged in.
   */
  defaultLastNameValue?: string
  /**
   * The default value for the email input. It is defined when the user is logged in.
   */
  defaultEmailValue?: string
}

/**
 * This page is used to display the contact us form.
 *
 * @props {@link ContactUsPageProps}
 */
function ContactUsPage({
  defaultFirstNameValue,
  defaultLastNameValue,
  defaultEmailValue,
}: ContactUsPageProps): JSX.Element {
  return (
    <Fragment>
      <div className='fixed inset-0 -z-20 bg-gradient-to-br from-background to-collaboration/50' />
      <main className='mx-auto min-h-[72vh] max-w-[90vw] md:max-w-lg lg:max-w-2xl'>
        <QuickFormCard
          className='my-[12vh]'
          title='Contact us 🎙️'
          summary="Share your thoughts, ideas, and feedback. We'd love to hear from you!"
          action={sendMessageAction}
          footer={<SubmitMessageButton />}
        >
          <div className='grid grid-cols-1 gap-x-6 sm:grid-cols-2'>
            <div>
              <Label htmlFor={ContactUsFormFieldNames.FirstName}>First name</Label>
              <ComposedInput
                name={ContactUsFormFieldNames.FirstName}
                defaultValue={defaultFirstNameValue}
                placeholder='Enter your first name'
                autoComplete='off'
              />
            </div>
            <div>
              <Label htmlFor={ContactUsFormFieldNames.LastName}>Last name</Label>
              <ComposedInput
                name={ContactUsFormFieldNames.LastName}
                defaultValue={defaultLastNameValue}
                placeholder='Enter your last name'
                autoComplete='off'
                autoCapitalize='off'
              />
            </div>
          </div>
          <div>
            <Label htmlFor={ContactUsFormFieldNames.Email}>Email</Label>
            <ComposedInput
              name={ContactUsFormFieldNames.Email}
              defaultValue={defaultEmailValue}
              placeholder='Enter your email'
              type='email'
              autoComplete='off'
              autoCapitalize='off'
            />
          </div>
          <div>
            <Label htmlFor={ContactUsFormFieldNames.Message}>Message</Label>
            <ComposedTextarea
              className='min-h-[100px]'
              name={ContactUsFormFieldNames.Message}
              placeholder='Enter your message'
            />
          </div>
        </QuickFormCard>
        <SubmitSuccessPanel />
      </main>
    </Fragment>
  )
}

export default ContactUsPage
