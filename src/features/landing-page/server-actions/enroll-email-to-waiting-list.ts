'use server'

import { redirect } from 'next/navigation'

import createWaitListRepository from '@root/repositories/wait-list/create-wait-list-repository'
import RegisterEmailToWaitListDataTransferObject from '@root/dto/register-email-to-wait-list.dto'

import WaitingListFieldNames from '../constants/waiting-list-field-names'
import WaitingListFormStateQuerySearchParams from '../constants/waiting-list-form-state-query-search-params'
import DataTransferObjectValidationException from '@root/dto/data-transfer-object-validation-exception'

/**
 * Enrolls the email address to the waiting list.
 */
async function enrollEmailToWaitingList(values: FormData) {
  const email = values.get(WaitingListFieldNames.emailAddress) as string | undefined

  if (!email) {
    return
  }

  const searchParams = new URLSearchParams()

  const dto = new RegisterEmailToWaitListDataTransferObject(email)

  try {
    await dto.validate()
  } catch (error) {
    if (error instanceof DataTransferObjectValidationException) {
      searchParams.append(WaitingListFormStateQuerySearchParams.error, 'This email is not valid.')
    }
  }

  const repo = createWaitListRepository()

  try {
    await repo.registerEmailToWaitList(dto)

    searchParams.append(WaitingListFormStateQuerySearchParams.success, 'true')
  } catch (error) {
    console.error('enrollEmailToWaitingList(): Failed to register email to waiting list', error)

    searchParams.append(WaitingListFormStateQuerySearchParams.error, 'Failed to register email to waiting list')
  }

  return redirect(`/?${searchParams.toString()}`)
}

export default enrollEmailToWaitingList
