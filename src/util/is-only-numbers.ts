/**
 * Checks whether or not the given {@link value} is only numbers.
 */
function isOnlyNumbers<T>(value: T): boolean {
  return /^\d+$/.test(String(value))
}

export default isOnlyNumbers
