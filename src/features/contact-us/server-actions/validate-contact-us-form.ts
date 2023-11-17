import isEmpty from '@root/util/is-empty'

import type FormValuesSchema from './contact-us-form-values-schema'

/**
 * The error message to display when a required field is empty. In the case of the "Contact Us" form, all fields are
 * required.
 */
const REQUIRED_FIELD_ERROR_MESSAGE = 'Please fill out this field.' as const

/**
 * Validates the "Contact Us" form and returns an object with the field names as keys and the error messages as values.
 */
function validateContactUsForm(formValues: FormValuesSchema) {
  const errorObject: {
    [K in keyof FormValuesSchema]?: string
  } = {}

  // Note: Filter the fields that are empty so we can associate them with the error message and append the `errorObject`
  // with the field name and the error message.
  const emptyFields = Object.entries(formValues).filter(([, value]) => isEmpty(value))

  for (const [field] of emptyFields) {
    errorObject[field as keyof typeof errorObject] = REQUIRED_FIELD_ERROR_MESSAGE
  }

  return errorObject
}

export default validateContactUsForm
