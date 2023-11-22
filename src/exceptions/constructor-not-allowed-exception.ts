/**
 * The exception that is thrown when the constructor of a class is called and the class is not allowed to be
 * instantiated.
 */
export default class ConstructorNotAllowedException extends Error {
  constructor(constructorName: string) {
    super(`The constructor of ${constructorName} is not allowed to be called.`)
  }
}
