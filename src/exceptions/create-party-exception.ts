class CreatePartyException extends Error {
  constructor(readonly message: string) {
    super(message)
  }
}

export default CreatePartyException
