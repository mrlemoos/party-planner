import type AuthLoginDataTransferObject from '@root/dto/auth-login.dto'
import type CreateAccountDataTransferObject from '@root/dto/create-account.dto'

import type CurrentUserResult from './current-user-result'
import type AuthLoginResult from './auth-login-result'

export default abstract class AuthRepository {
  /**
   * Returns the currently logged in user. If no user is logged in, the function will return `undefined`.
   *
   * @see {@link CurrentUserResult}
   */
  abstract currentUser(): Promise<CurrentUserResult | undefined>
  /**
   * Creates a new user account with the given username and password. If the account is created successfully, the
   * function will return a JWT token that can be used to authenticate the user in future requests.
   *
   * @see {@link CreateAccountDataTransferObject}
   */
  abstract signUp(dto: CreateAccountDataTransferObject): Promise<AuthLoginResult>
  /**
   * Attempts to log in with the given email and password. If the login is successful, the function will return a JWT
   * token that can be used to authenticate the user in future requests.
   *
   * @see {@link AuthLoginDataTransferObject}
   */
  abstract login(dto: AuthLoginDataTransferObject): Promise<AuthLoginResult>
}
