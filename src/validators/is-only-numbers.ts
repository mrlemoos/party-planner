import DigitsRegex from '@root/constants/digits-regex'

/**
 * Checks whether or not the given {@link value} contains only numbers (0-9). This function makes use of the constant
 * {@link DigitsRegex} to perform the validation.
 *
 * @see {@link DigitsRegex}
 */
function isOnlyNumbers<T extends string>(value: T): boolean {
  return DigitsRegex.test(value)
}

export default isOnlyNumbers
