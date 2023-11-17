import { type UserPlan } from '@prisma/client'

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
}

export default UserPlanRepository
