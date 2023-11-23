export default class UserPlanSubscriptionNotFoundException extends Error {
  constructor(userId: string) {
    super(`UserPlanSubscription could not be found with the given userId "${userId}".`)
  }
}
