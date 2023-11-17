import PrismaUserPlanRepository from '@root/repositories/_/prisma/prisma-user-plan-repository'

import UserPlanRepository from './user-plan-repository'

/**
 * Creates an instance of the {@link UserPlanRepository}.
 */
function createUserPlanRepository(): UserPlanRepository {
  return new PrismaUserPlanRepository()
}

export default createUserPlanRepository
