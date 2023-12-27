'use server'

import { revalidatePath } from 'next/cache'

import createPartiesRepository from '@root/repositories/parties/create-parties-repository'
import RegisterTicketDataTransferObject from '@root/repositories/parties/dto/register-ticket-data-transfer-object'

import computeTicketId from '../util/compute-ticket-id'

const repo = createPartiesRepository()

/**
 * Dispatch the server action to register the ticket.
 */
export async function registerTicketAction(partyId: string, values: FormData) {
  const ticketSummary = values.get('ticketSummary')

  if (typeof ticketSummary !== 'string') {
    throw new Error('Ticket summary is required.')
  }

  const ticketId = computeTicketId(ticketSummary)

  const dto = new RegisterTicketDataTransferObject(partyId, ticketSummary, ticketId)
  await repo.registerTicket(dto)

  revalidatePath(`/parties/${partyId}/create`)
}
