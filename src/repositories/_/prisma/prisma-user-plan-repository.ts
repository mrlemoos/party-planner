import { PrismaClient, type UserPlan } from '@prisma/client'

import UserPlanRepository from '@root/repositories/user/plan/user-plan-repository'
import UserPlanNotFoundException from '@root/repositories/user/plan/user-plan-not-found-exception'

class PrismaUserPlanRepository extends UserPlanRepository {
  private readonly PRISMA_CLIENT = new PrismaClient()

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
