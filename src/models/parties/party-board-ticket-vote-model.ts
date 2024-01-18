/**
 * The class (model) which represents a vote by a party member on a ticket in the application.
 */
class PartyBoardTicketVoteModel {
  constructor(
    /**
     * The ID of the vote by the party member on the ticket.
     */
    public readonly id: string,
    /**
     * The ID of the ticket the vote by the party member belongs to.
     */
    public readonly memberId: string,
    /**
     * The actual vote by the party member on the ticket.
     */
    public readonly vote: string,
  ) {}
}

export default PartyBoardTicketVoteModel
