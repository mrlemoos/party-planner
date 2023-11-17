interface CurrentUserResult {
  /**
   * The display name of the user.
   */
  displayName: string
  /**
   * The email address of the user.
   */
  email?: string
  /**
   * Boolean flag indicating whether the user's email address has been verified.
   */
  isEmailVerified: boolean
  /**
   * The URL of the user's profile picture.
   */
  photoURL?: string
  /**
   * The phone number normalized based on the E.164 standard (e.g. +16505550101) for the user. This is `undefined` if
   * the user has no phone credential linked to the account.
   */
  phoneNumber?: string
  /**
   * The unique identifier of the user.
   */
  uid: string
  /**
   * The JWT token that can be used to authenticate the user in future requests.
   */
  token: string
}

export default CurrentUserResult
