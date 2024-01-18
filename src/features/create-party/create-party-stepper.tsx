import { type JSX } from 'react'

import CreatePartySteps from './constants/create-party-step'
import Stepper from '@root/components/ui/stepper'

type CreatePartyStepName = (typeof CreatePartySteps)[keyof typeof CreatePartySteps]

interface CreatePartyStepperProps {
  /**
   * The key of the {@link CreatePartyStepName | current step}.
   *
   * @see {@link CreatePartyStepName}
   */
  currentStepKey?: CreatePartyStepName
}

/**
 * The component that composes the stepper of the party creation process.
 *
 * @props {@link CreatePartyStepperProps}
 */
function CreatePartyStepper({ currentStepKey = 'NAME_YOUR_PARTY' }: CreatePartyStepperProps): JSX.Element {
  return (
    <Stepper currentStepKey={currentStepKey}>
      <span key={CreatePartySteps.NAME_YOUR_PARTY}>Name your party</span>
      <span key={CreatePartySteps.TEAM_INVITATION}>Invite your team</span>
    </Stepper>
  )
}

export default CreatePartyStepper
