'use server'

import { RedirectType, redirect } from 'next/navigation'

import ContactUsFormFieldNames from '../constants/contact-us-form-field-names'
import ContactUsSearchParams from '../constants/contact-us-search-params'

import validateContactUsForm from './validate-contact-us-form'

/**
 * The error message that is displayed when a required field is not filled out.
 */
const PAGE_PATHNAME = '/contact-us' as const

/**
 * This server action is responsible for sending the message from the user to our team.
 */
async function sendMessageAction(values: FormData): Promise<never> {
  const firstName = values.get(ContactUsFormFieldNames.FirstName) as string | undefined
  const lastName = values.get(ContactUsFormFieldNames.LastName) as string | undefined
  const email = values.get(ContactUsFormFieldNames.Email) as string | undefined
  const message = values.get(ContactUsFormFieldNames.Message) as string | undefined

  const errors = validateContactUsForm({ firstName, lastName, email, message })

  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(errors)) {
    searchParams.append(key, value)
  }

  // TODO: Send the message to the server.

  if (Object.keys(errors).length === 0) {
    searchParams.append(
      ContactUsSearchParams.SUCCESS_QUERY_URL_SEARCH_PARAM_KEY,
      ContactUsSearchParams.SUCCESS_QUERY_URL_SEARCH_PARAM_VALUE,
    )
  }

  const pathnameWithQuery = searchParams.size > 0 ? `${PAGE_PATHNAME}?${searchParams.toString()}` : PAGE_PATHNAME

  return redirect(pathnameWithQuery, RedirectType.replace)
}

export default sendMessageAction
