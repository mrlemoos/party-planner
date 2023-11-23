import { type UserPlan, type UserPlanSubscription } from '@prisma/client'

abstract class UserPlanRepository {
  /**
   * Fetches the {@link UserPlan | user plan} of the user with the given id and returns the object with the user plan.
   *
   * @see {@link UserPlan}
   */
  abstract fetchUserPlan(userPlanId: string): Promise<UserPlan>
  /**
   * Fetches the list of {@link UserPlan | user plans} of the user with the given id and returns the list of user plans.
   */
  abstract fetchUserPlans(): Promise<UserPlan[]>
  /**
   * Fetches the {@link UserPlanSubscription | user plan subscription} of the user with the given {@link userId} and
   * returns the object with the user plan subscription.
   *
   * @see {@link UserPlanSubscription}
   */
  abstract fetchUserSubscriptionByUserId(userId: string): Promise<UserPlanSubscription>
  /**
   * Subscribes the user with the given {@link userId} to the plan with the given {@link planId} and returns the
   * {@link UserPlanSubscription | user plan subscription} object.
   */
  abstract subscribeUserToPlan(userId: string, planId: string): Promise<UserPlanSubscription>
}

export default UserPlanRepository
