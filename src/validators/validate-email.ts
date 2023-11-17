/**
 * The regular expression pattern for validating an email address.
 */
const EMAIL_REGEX_PATTERN = /\S+@\S+\.\S+/

/**
 * Checks whether the given string is a valid email address and returns a boolean on the result.
 */
function validateEmail(email: string): boolean {
  return EMAIL_REGEX_PATTERN.test(email)
}

export default validateEmail
