'use client'

import { useFormStatus } from 'react-dom'

import Button from '@root/components/ui/button'
import Ellipsis from '@root/components/ui/ellipsis'
import merge from '@root/util/merge'

/**
 * The submit message button is used to submit the contact us form.
 */
function SubmitMessageButton(): JSX.Element {
  const { pending } = useFormStatus()

  return (
    <Button
      variant='primary'
      className={merge('w-full', {
        'pointer-events-none': pending,
      })}
      type='submit'
    >
      {pending ? <Ellipsis /> : 'Send message'}
    </Button>
  )
}

export default SubmitMessageButton
