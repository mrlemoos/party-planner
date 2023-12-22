import type PartyMemberModel from './party-member-model'
import type ScrumTicketModel from './scrum-ticket-model'

/**
 * The model for the party room.
 */
interface PartyModel {
  id: string
  name: string

  partyMembers?: PartyMemberModel[]

  tickets?: ScrumTicketModel[]

  createdAt: string
  updatedAt: string
}

export default PartyModel
