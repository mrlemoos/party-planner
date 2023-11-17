class UserNotSignedInException extends Error {
  constructor() {
    super('User is not signed in.')
  }
}

export default UserNotSignedInException
