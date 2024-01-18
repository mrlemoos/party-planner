/**
 * The class (model) which represents a party in the application.
 */
class PartyModel {
  constructor(
    /**
     * The ID of the party. Commonly, this value corresponds to an Universally Unique Identifier (UUID).
     */
    public readonly id: string,
    /**
     * The date timestamp with timezone when the party was created in the database. Commonly, this value corresponds to
     * an ISO 8601 date string.
     */
    public readonly createdAt: string,
    /**
     * The name given to the party.
     */
    public readonly name: string,
  ) {}
}

export default PartyModel
