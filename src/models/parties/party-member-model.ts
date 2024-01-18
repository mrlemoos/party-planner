/**
 * The class (model) which represents a party member in the application.
 */
class PartyMemberModel {
  constructor(
    /**
     * The ID of the party member. Commonly, this value corresponds to an Universally Unique Identifier (UUID). Please
     * note that this value is not the same as the ID of the user managed by the authentication provider.
     */
    public readonly id: string,
    /**
     * The date timestamp with timezone when the party member was created in the database. This value corresponds to an
     * ISO 8601 date string.
     */
    public readonly createdAt: string,
    /**
     * The ID of the user managed by the authentication provider.
     */
    public readonly userId: string,
    /**
     * The strict enum string which represents the current network status of the party member against the party.
     */
    public readonly networkStatus: 'Online' | 'Offline',
    /**
     * The ID of the party the party member belongs to.
     */
    public readonly partyId: string,
    /**
     * The display name of the user managed by the authentication provider.
     */
    public readonly userDisplayName: string,
  ) {}
}

export default PartyMemberModel
