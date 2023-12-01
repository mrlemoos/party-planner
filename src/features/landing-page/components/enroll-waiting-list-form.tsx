import { Fragment } from 'react'

import Input from '@root/components/ui/input'
import Paragraph from '@root/components/ui/paragraph'

import WaitingListFieldNames from '../constants/waiting-list-field-names'
import enrollEmailToWaitingList from '../server-actions/enroll-email-to-waiting-list'

import EnrollWaitingListSubmitButton from './enroll-waiting-list-submit-button'

function EnrollWaitingListForm(): JSX.Element {
  return (
    <Fragment>
      <Paragraph className='md:max-w-[68rem]'>
        As Planria is still in beta, we are actively picking sign-ups to help us with feedback of the Planria
        experience. If you would like to be notified when we open up to new users in this beta phase, please sign up to
        our waiting list.
      </Paragraph>
      <form action={enrollEmailToWaitingList}>
        <div className='mt-4 flex items-center gap-2'>
          <Input
            name={WaitingListFieldNames.emailAddress}
            autoComplete='off'
            autoCapitalize='off'
            className='md:max-w-md lg:max-w-lg'
            placeholder='Your email address'
          />
          <EnrollWaitingListSubmitButton />
        </div>
      </form>
    </Fragment>
  )
}

export default EnrollWaitingListForm
