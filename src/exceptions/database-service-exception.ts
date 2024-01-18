/**
 * An exception which is thrown when a database service fails.
 */
class DatabaseServiceException extends Error {
  constructor(
    readonly message: string,
    public readonly code: string,
  ) {
    super(`${message} (Code: ${code})`)
    this.name = 'DatabaseServiceException'
  }
}

export default DatabaseServiceException
