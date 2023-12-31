import { type UserPlanSubscription, type UserPlan } from '@prisma/client'

import UserPlanRepository from '@root/repositories/user/plan/user-plan-repository'
import UserPlanNotFoundException from '@root/repositories/user/plan/user-plan-not-found-exception'
import PrismaService from '@root/services/prisma-service'
import UserPlanSubscriptionNotFoundException from '@root/repositories/user/plan/user-plan-subscription-not-found-exception'

class PrismaUserPlanRepository extends UserPlanRepository {
  private readonly PRISMA_CLIENT = PrismaService.client()

  async fetchUserSubscriptionByUserId(userId: string): Promise<UserPlanSubscription> {
    const userPlanSubscription = await this.PRISMA_CLIENT.userPlanSubscription.findFirst({
      where: {
        userId,
      },
    })

    if (!userPlanSubscription) {
      throw new UserPlanSubscriptionNotFoundException(userId)
    }

    return userPlanSubscription
  }
  async subscribeUserToPlan(userId: string, planId: string): Promise<UserPlanSubscription> {
    const existentUserSubscription = await this.PRISMA_CLIENT.userPlanSubscription.findFirst({
      where: {
        userId,
      },
    })

    const hasPlan = !!existentUserSubscription

    // NOTE: If the user already has a plan, update the planId instead of creating a new subscription. This is to avoid
    // having multiple subscriptions for the same user.
    if (hasPlan) {
      if (existentUserSubscription.planId === planId) {
        return existentUserSubscription
      }

      const subscriptionRegistryId = existentUserSubscription.id

      const newUserPlanSubscription = { ...existentUserSubscription, planId }

      return await this.PRISMA_CLIENT.userPlanSubscription.update({
        data: newUserPlanSubscription,
        where: {
          id: subscriptionRegistryId,
        },
      })
    }
    return await this.PRISMA_CLIENT.userPlanSubscription.create({
      data: {
        userId,
        planId,
      },
    })
  }

  async fetchUserPlans(): Promise<UserPlan[]> {
    const userPlans = await this.PRISMA_CLIENT.userPlan.findMany()

    return userPlans
  }

  async fetchUserPlan(userPlanId: string): Promise<UserPlan> {
    const userPlan = await this.PRISMA_CLIENT.userPlan.findUnique({
      where: {
        id: userPlanId,
      },
    })

    if (!userPlan) {
      throw new UserPlanNotFoundException(userPlanId)
    }

    return userPlan
  }
}

export default PrismaUserPlanRepository
