'use server'

import AuthService from '@root/services/auth-service'

import FormInputNames from '../constants/form-input-names'

const service = new AuthService()

/**
 * The server action that handles the login form submission when the user selects the anonymous login option.
 */
async function loginAnonymously(values: FormData) {
  const username = values.get(FormInputNames.Username)?.toString() as string

  await service.loginAnonymously(username)
}

export default loginAnonymously
