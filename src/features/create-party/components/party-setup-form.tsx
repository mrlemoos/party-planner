import { InfoCircledIcon } from '@radix-ui/react-icons'

import Button from '@root/components/ui/button'
import Fieldset from '@root/components/ui/fieldset'
import Label from '@root/components/ui/label'
import Tooltip from '@root/components/ui/tooltip'

import CreatePartyInputNames from '../constants/create-party-input-names'
import namePartyAction from '../server-actions/name-party-action'

import SingularInput from './singular-input'

interface PartySetupFormProps {
  /**
   * The name of the party that will be used as the default value for the party name input.
   */
  partyName: string
  /**
   * The string that identifies the party.
   */
  partyId: string
}

/**
 * The PartySetupForm component.
 *
 * @props {@link PartySetupFormProps}
 */
function PartySetupForm({ partyName, partyId }: PartySetupFormProps): JSX.Element {
  const handleSubmit = namePartyAction.bind(null, partyId)

  return (
    <section className='flex w-full flex-col gap-2'>
      <div className='relative flex flex-col gap-1'>
        <Label className='text-lg font-medium' htmlFor={CreatePartyInputNames.PartyName}>
          Please name your party
        </Label>
        <Tooltip
          content={
            <span className='text-sm'>
              A party is a section in which your team estimates the tickets. <br /> <b>Recommendation</b>: Use the
              Sprint name, <i>e.g.</i>, &quot;Sprint 1.&quot;
            </span>
          }
        >
          <div className='absolute right-0 top-0 flex cursor-help items-center gap-1 text-gray-500'>
            <InfoCircledIcon className='h-4 w-4' aria-hidden='true' />
            <span>What&apos;s a party?</span>
          </div>
        </Tooltip>
      </div>
      <form className='w-full' action={handleSubmit}>
        <Fieldset>
          <SingularInput
            className='my-4'
            defaultValue={partyName}
            name={CreatePartyInputNames.PartyName}
            required={true}
            autoFocus={true}
            aria-label='Enter the name of your party'
          />
        </Fieldset>
        <Button type='submit' className='w-full'>
          Continue
        </Button>
      </form>
    </section>
  )
}

export default PartySetupForm
