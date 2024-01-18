import { type JSX } from 'react'

import { motion } from 'framer-motion'

import useCreatePartyWizardFormContext from '../../hooks/use-create-party-wizard-form-context'

import SelectNameSuggestionEvent from './events/select-name-suggestion-event'
import useNamePartyFormController from './hooks/use-name-party-form-controller'
import renamePartyServerAction from './server-actions/rename-party-server-action'
import NamePartySubmitButton from './components/name-party-submit-button'
import NamePartySuperTitle from './components/name-party-super-title'
import NameSuggestions from './components/name-suggestions'
import PartyNameTextInput from './components/party-name-text-input'

interface NameYourPartyFormProps {
  defaultPartyName: string
  partyId: string
}

/**
 * This component generates the form area for the "Name your party" step of the create party wizard.
 *
 * @props {@link NameYourPartyFormProps}
 */
function NameYourPartyForm({ defaultPartyName, partyId }: NameYourPartyFormProps): JSX.Element | null {
  const { handlePartyNameControlledInputChange, handleSetPartyNameControlledValue, partyNameControlledInputValue } =
    useNamePartyFormController({ defaultValue: defaultPartyName })

  const { step } = useCreatePartyWizardFormContext()
  const isCurrentStep = step === 'NAME_YOUR_PARTY'

  const isPartyNameDefault = partyNameControlledInputValue === defaultPartyName

  const renamePartyServerActionWithPartyId = renamePartyServerAction.bind(null, partyId)

  function handleSelectSuggestion(event: SelectNameSuggestionEvent) {
    handleSetPartyNameControlledValue(event.name)
  }

  if (!isCurrentStep) {
    return null
  }

  return (
    <form action={renamePartyServerActionWithPartyId}>
      <NamePartySuperTitle />
      <PartyNameTextInput value={partyNameControlledInputValue} onChange={handlePartyNameControlledInputChange} />

      <NameSuggestions
        defaultPartyName={defaultPartyName}
        isDefaultPartyNameSuggested={isPartyNameDefault}
        onSelectSuggestion={handleSelectSuggestion}
      />

      <motion.div className='mt-36 flex justify-center' layout={true}>
        <NamePartySubmitButton>Continue</NamePartySubmitButton>
      </motion.div>
    </form>
  )
}

export default NameYourPartyForm
