import { type ReactNode, useMemo, type JSX } from 'react'

import { useSearchParams } from 'next/navigation'

import CreatePartyWizardFormContext from '../contexts/create-party-wizard-form-context'
import CreatePartySteps from '../constants/create-party-step'

type CreatePartyStepName = (typeof CreatePartySteps)[keyof typeof CreatePartySteps]

interface CreatePartyWizardFormProviderProps {
  children: ReactNode
}

function CreatePartyWizardFormProvider({ children }: CreatePartyWizardFormProviderProps): JSX.Element {
  const searchParams = useSearchParams()
  const rawStepValue = searchParams.get('step')

  const step = (rawStepValue ?? CreatePartySteps.NAME_YOUR_PARTY) as CreatePartyStepName

  const contextValue = useMemo(() => ({ step }), [step])

  return <CreatePartyWizardFormContext.Provider value={contextValue}>{children}</CreatePartyWizardFormContext.Provider>
}

export default CreatePartyWizardFormProvider
