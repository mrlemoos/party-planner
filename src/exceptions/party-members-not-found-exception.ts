/**
 * The exception that is thrown when one or more party members are not found.
 */
class PartyMembersNotFoundException extends Error {
  constructor(readonly message: string) {
    super(message)
    this.name = 'PartyMembersNotFoundException'
  }
}

export default PartyMembersNotFoundException
