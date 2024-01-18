import type PartyBoardTicket from './party-board-ticket'

interface PartyBoard {
  boardId: string
  boardName: string
  focusedTicketId?: string | null
  tickets: PartyBoardTicket[]
}

export default PartyBoard
