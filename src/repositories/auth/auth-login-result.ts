interface AuthLoginResult {
  /**
   * The JWT token that can be used to authenticate the user in future requests.
   */
  accessToken: string
  /**
   * The phone number of the user.
   */
  phoneNumber?: string
  /**
   * The email address of the user.
   */
  emailAddress?: string
  /**
   * The display name of the user.
   */
  displayName?: string
  /**
   * The user ID of the user.
   */
  userId: string
  /**
   * Whether the user's email address has been verified.
   */
  isEmailVerified: boolean
}

export default AuthLoginResult
