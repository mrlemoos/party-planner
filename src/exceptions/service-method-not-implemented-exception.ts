/**
 * The exception that is thrown when a service method is not implemented.
 */
export default class ServiceMethodNotImplementedException extends Error {
  constructor(public readonly methodName: string) {
    super(
      `${
        methodName.endsWith('()') ? methodName : `${methodName}()`
      } is not implemented yet. Please implement it in the service class.`,
    )
  }
}
