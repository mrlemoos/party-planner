class CreatePartyMemberException extends Error {
  constructor(readonly message: string) {
    super(message)

    this.name = 'CreatePartyMemberException'
  }
}

export default CreatePartyMemberException
