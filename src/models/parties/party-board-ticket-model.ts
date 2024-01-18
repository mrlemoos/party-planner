import type PartyBoardTicketVoteModel from './party-board-ticket-vote-model'

/**
 * The class (model) which represents a ticket on a board in the application.
 */
class PartyBoardTicketModel {
  constructor(
    /**
     * The ID of the ticket on the board. Commonly, this value corresponds to an Universally Unique Identifier (UUID).
     */
    public readonly id: string,
    /**
     * The summary of the ticket on the board.
     */
    public readonly summary: string,
    /**
     * A description of the ticket on the board.
     */
    public readonly description: string | null | undefined,
    /**
     * The votes on the ticket on the board.
     */
    public readonly votes: PartyBoardTicketVoteModel[],
  ) {}
}

export default PartyBoardTicketModel
