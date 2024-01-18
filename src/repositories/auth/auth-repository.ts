import type UserModel from '@root/models/user-model'

export default abstract class AuthRepository {
  /**
   * Returns the currently logged in user. If no user is logged in, the function will return `undefined`.
   *
   * @see {@link CurrentUserResult}
   */
  abstract currentUser(): Promise<UserModel | undefined>
  /**
   * Returns the currently logged in user's token. If no user is logged in, the function will return `null`.
   */
  abstract getCurrentUserTokenByTemplate<T extends string>(template: T): Promise<string | null>
}
