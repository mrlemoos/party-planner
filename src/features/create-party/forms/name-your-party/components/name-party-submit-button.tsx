import { type ReactNode, type JSX } from 'react'
import { useFormStatus } from 'react-dom'

import { ArrowRightIcon } from '@radix-ui/react-icons'

import Button from '@root/components/ui/button'

interface NamePartySubmitButtonProps {
  children: ReactNode
}

/**
 * The wrapper for the submit button in the "Name your party" step of the create party wizard.
 *
 * @props {@link NamePartySubmitButtonProps}
 */
function NamePartySubmitButton({ children }: NamePartySubmitButtonProps): JSX.Element {
  const status = useFormStatus()

  const isLoading = status.pending

  return (
    <div className='mt-36 flex justify-center'>
      <Button isLoading={isLoading}>
        {children}
        <ArrowRightIcon height={20} width={20} aria-hidden='true' className='ml-2' />
      </Button>
    </div>
  )
}

export default NamePartySubmitButton
