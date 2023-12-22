/**
 * Checks whether or not the given string {@link value} is upper-cased.
 */
function isUpperCased<T extends string>(value: T): boolean {
  return value === value.toUpperCase()
}

export default isUpperCased
