/**
 * The exception thrown when a user plan is not found.
 */
class UserPlanNotFoundException extends Error {
  constructor(userPlanId: string) {
    super(`The userPlanId "${userPlanId}" does not have a user plan.`)
  }
}

export default UserPlanNotFoundException
