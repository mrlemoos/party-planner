import { ContextType, useContext } from 'react'

import CreatePartyWizardFormContext from '../contexts/create-party-wizard-form-context'

/**
 * This hook allows the consumer to access the data made available by the `<CreatePartyWizardFormProvider>` with the
 * management of {@link CreatePartyWizardFormContext}.
 *
 * @see {@link CreatePartyWizardFormContext}
 */
function useCreatePartyWizardFormContext(): ContextType<typeof CreatePartyWizardFormContext> {
  const context = useContext(CreatePartyWizardFormContext)

  if (!context) {
    throw new Error(
      'useCreatePartyWizardFormContext must be used within a CreatePartyWizardFormProvider. See your useCreatePartyWizardFormContext() implementation for more details.',
    )
  }

  return context
}

export default useCreatePartyWizardFormContext
