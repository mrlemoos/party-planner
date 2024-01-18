'use client'

import { type JSX } from 'react'

import { motion } from 'framer-motion'

import CreatePartyWizardFormProvider from './providers/create-party-wizard-form-provider'
import NameYourPartyForm from './forms/name-your-party/name-your-party-form'

interface CreatePartyWizardFormProps {
  suggestedPartyName: string
  partyId: string
}

function CreatePartyWizardForm({ suggestedPartyName, partyId }: CreatePartyWizardFormProps): JSX.Element {
  return (
    <CreatePartyWizardFormProvider>
      <motion.div className='flex w-full flex-col items-center justify-center' layout={true}>
        <NameYourPartyForm defaultPartyName={suggestedPartyName} partyId={partyId} />
      </motion.div>
    </CreatePartyWizardFormProvider>
  )
}

export default CreatePartyWizardForm
