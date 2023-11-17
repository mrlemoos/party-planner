import type ContactUsFormFieldNames from '../constants/contact-us-form-field-names'

/**
 * The type that maps the field names to their values in the "Contact Us" form.
 */
type FormValuesSchema = {
  [K in (typeof ContactUsFormFieldNames)[keyof typeof ContactUsFormFieldNames]]?: string | undefined
}

export default FormValuesSchema
