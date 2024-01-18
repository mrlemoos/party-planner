class RenamePartyException extends Error {
  constructor(readonly message: string) {
    super(message)
  }
}

export default RenamePartyException
