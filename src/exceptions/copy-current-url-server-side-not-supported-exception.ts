/**
 * The error thrown when the {@link copyCurrentURL} function is called on the server side.
 */
class CopyCurrentURLServerSideNotSupportedException extends Error {
  constructor() {
    super('The copyCurrentURL() function is not supported on the server side.')
  }
}

export default CopyCurrentURLServerSideNotSupportedException
