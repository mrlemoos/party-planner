import type PartyBoardTicketVote from './party-board-ticket-vote'

interface PartyBoardTicket {
  id: string
  summary: string
  description?: string | null
  votes: PartyBoardTicketVote[]
}

export default PartyBoardTicket
