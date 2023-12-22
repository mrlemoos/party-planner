'use server'

import { revalidatePath } from 'next/cache'

import createPartiesRepository from '@root/repositories/parties/create-parties-repository'

const repo = createPartiesRepository()

/**
 * Dispatch the server action to register the ticket.
 */
export async function registerTicketAction(partyId: string, values: FormData) {
  const ticket = await repo.registerTicket(partyId, values)
}
