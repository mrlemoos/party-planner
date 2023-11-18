import type CurrentUserResult from './current-user-result'

export default abstract class AuthRepository {
  /**
   * Returns the currently logged in user. If no user is logged in, the function will return `undefined`.
   *
   * @see {@link CurrentUserResult}
   */
  abstract currentUser(): Promise<CurrentUserResult | undefined>
}
