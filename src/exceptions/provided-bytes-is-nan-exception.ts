/**
 * An exception thrown when the provided bytes for a given value is NaN.
 */
class ProvidedBytesIsNaNException<U> extends Error {
  constructor(name: string, value: U) {
    super(`The provided bytes for "${name}" is NaN. Received the following value: ${value}`)
  }
}

export default ProvidedBytesIsNaNException
