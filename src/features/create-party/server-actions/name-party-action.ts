'use server'

import { redirect } from 'next/navigation'

import createPartiesRepository from '@root/repositories/parties/create-parties-repository'
import RenamePartyDataTransferObject from '@root/repositories/parties/dto/rename-party-data-transfer-object'

import CreatePartyInputNames from '../constants/create-party-input-names'
import CreatePartyStep from '../enums/create-party-step'

const repo = createPartiesRepository()

/**
 * Dispatch the server action to name the party.
 */
async function namePartyAction(partyId: string, values: FormData): Promise<void> {
  const partyName = values.get(CreatePartyInputNames.PartyName) as string | null

  if (!partyName) {
    return
  }

  try {
    await repo.renameParty(new RenamePartyDataTransferObject(partyId, partyName))

    const searchParams = new URLSearchParams()
    searchParams.set('step', CreatePartyStep.PROVIDE_THE_TICKETS)

    return redirect(`/parties/create/${partyId}?${searchParams.toString()}`)
  } catch (error) {
    const searchParams = new URLSearchParams()
    searchParams.set('error', 'It was not possible to rename the party. Please try again.')

    if (error) {
      console.error(`namePartyAction(): An error occurred while renaming the party: ${error}`)
    }

    return redirect(`/parties/create/${partyId}?${searchParams.toString()}`)
  }
}

export default namePartyAction
