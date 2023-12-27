import { useId } from 'react'

import Input from '@root/components/ui/input'
import Label from '@root/components/ui/label'
import Paragraph from '@root/components/ui/paragraph'
import Small from '@root/components/ui/small'
import merge from '@root/util/merge'

/**
 * The component that composes the form that allows the user to register the tickets in the party and, therefore, the
 * Scrum team members that will be able to participate in the party.
 */
function RegisterTicketsForm(): JSX.Element {
  const manualTicketInputSummary = useId()

  return (
    <section className='flex w-full flex-col gap-2'>
      <Label className='text-lg font-medium' htmlFor={manualTicketInputSummary}>
        Sign your tickets
      </Label>
      <Paragraph>
        You can sign your tickets by selecting a file from your file system or by adding them manually.
      </Paragraph>
      <div className='flex flex-col gap-2'>
        <Input
          name={manualTicketInputSummary}
          className={merge('w-full rounded-lg')}
          placeholder='e.g. Create the prettiest button ever!'
        />
        <Small className='mt-6 leading-4 text-foreground/50'>
          TIP: If you type the combination [TICKET ID] [TICKET SUMMARY], <i>e.g.</i>, &ldquo;
          <code className='text-foreground/80'>ABC-123 Fix the bug</code>,&rdquo; the ticket will be automatically
          identified.
        </Small>
      </div>
    </section>
  )
}

export default RegisterTicketsForm
