/**
 * The regular expression pattern for validating a phone number.
 */
const PHONE_REGEX = /^\+(?:[\d] ?){6,14}[\d]$/
/**
 * The regular expression pattern for validating a country code.
 */
const COUNTRY_CODE_REGEX = /^[1-9]\d{0,2}$/

/**
 * Validates the phone number and country code and returns a boolean on the result.
 */
export default function validatePhoneNumber(countryCode: string, phoneNumber: string): boolean {
  if (typeof countryCode !== 'string' || typeof phoneNumber !== 'string') {
    return false
  }

  if (!COUNTRY_CODE_REGEX.test(countryCode)) {
    return false
  }

  if (!PHONE_REGEX.test(phoneNumber)) {
    return false
  }

  return true
}
