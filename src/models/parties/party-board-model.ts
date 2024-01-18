/**
 * The class (model) which represents the board belonging to a party.
 */
class PartyBoardModel {
  constructor(
    /**
     * The ID of the board.
     */
    public readonly id: string,
    /**
     * The date timestamp with timezone when the board was created.
     */
    public readonly createdAt: string,
    /**
     * The ID of the party the board belongs to.
     */
    public readonly partyId: string,
    /**
     * The name of the board. Recommended to suggest for the end user to name the board with the party name, "Sprint 1."
     *
     * @example "Sprint 1."
     */
    public readonly boardName: string,
    /**
     * The ID of the ticket that is currently focused on the board.
     */
    public readonly focusedTicketId: string | undefined | null,
  ) {}
}

export default PartyBoardModel
