'use server'

import AuthService from '@root/services/auth-service'

import FormInputNames from '../constants/form-input-names'

const service = new AuthService()

/**
 * The server action that handles the login form submission when the user selects the login with email and password.
 */
async function login(values: FormData) {
  const username = values.get(FormInputNames.Username)?.toString() as string
  const password = values.get(FormInputNames.Password)?.toString() as string

  await service.login(username, password)
}

export default login
