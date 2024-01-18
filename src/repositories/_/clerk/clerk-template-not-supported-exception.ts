class ClerkTemplateNotSupportedException extends Error {
  constructor(public readonly message: string) {
    super(message)
    this.name = 'ClerkTemplateNotSupportedException'
  }
}

export default ClerkTemplateNotSupportedException
