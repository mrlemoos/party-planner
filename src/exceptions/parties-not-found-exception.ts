class PartiesNotFoundException extends Error {
  constructor(readonly message: string) {
    super(message)
  }
}

export default PartiesNotFoundException
