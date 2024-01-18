import { createContext } from 'react'

import CreatePartySteps from '../constants/create-party-step'

/**
 * The type for the create party wizard form context.
 */
interface CreatePartyWizardFormContextType {
  step: keyof typeof CreatePartySteps
}

/**
 * The context for the create party wizard form.
 */
const CreatePartyWizardFormContext = createContext<CreatePartyWizardFormContextType>(
  {} as CreatePartyWizardFormContextType,
)

export default CreatePartyWizardFormContext
