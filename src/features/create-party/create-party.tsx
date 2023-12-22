'use client'

import { type ComponentPropsWithoutRef } from 'react'

import Heading from '@root/components/ui/heading'

import AnimatedStepFormContainer from './components/animated-step-form-container'
import PartySetupForm from './components/party-setup-form'
import PartySetupStepIndicator from './components/party-setup-step-indicator'
import RegisterTicketsForm from './components/register-tickets-form'
import CreatePartyStep from './enums/create-party-step'

/**
 * The props for the PartySetupForm component.
 */
type PartySetupFormProps = ComponentPropsWithoutRef<typeof PartySetupForm>
/**
 * The (picked) props for the PartySetupForm component.
 */
type PickedPartySetupFormProps = Pick<PartySetupFormProps, 'partyId' | 'partyName'>
/**
 * The props for the {@link PartySetupStepIndicator} component.
 */
type PartySetupStepIndicatorProps = ComponentPropsWithoutRef<typeof PartySetupStepIndicator>
/**
 * The (picked) props for the {@link PartySetupStepIndicator} component.
 */
type PickedPartySetupStepIndicatorProps = Pick<PartySetupStepIndicatorProps, 'currentStepKey'>
/**
 * The (picked) props for the {@link PartySetupStepIndicator} component.
 */
type PartialPickedPartySetupStepIndicatorProps = Partial<PickedPartySetupStepIndicatorProps>
/**
 * The props for the {@link CreateParty} component.
 */
type CreatePartyProps = PickedPartySetupFormProps & PartialPickedPartySetupStepIndicatorProps

/**
 * The component that composes the portion of the UI that allows the user to create a party.
 *
 * @props {@link CreatePartyProps}
 */
function CreateParty({
  partyId,
  partyName,
  currentStepKey = CreatePartyStep.NAME_YOUR_PARTY,
}: CreatePartyProps): JSX.Element {
  return (
    <main className='container mt-32 flex min-h-[calc(86dvh-8rem)] flex-col items-center gap-9'>
      <Heading hierarchy='h1'>Let&apos;s create your party</Heading>
      <AnimatedStepFormContainer key={currentStepKey}>
        {currentStepKey === CreatePartyStep.NAME_YOUR_PARTY && (
          <PartySetupForm partyName={partyName} partyId={partyId} />
        )}
        {currentStepKey === CreatePartyStep.PROVIDE_THE_TICKETS && <RegisterTicketsForm />}
      </AnimatedStepFormContainer>
    </main>
  )
}

export default CreateParty
