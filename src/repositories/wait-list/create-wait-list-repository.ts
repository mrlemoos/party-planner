import { PrismaClient } from '@prisma/client'

import WaitListRepository from './wait-list-repository'
import PrismaWaitListRepository from '../_/prisma/prisma-wait-list-repository'

/**
 * Creates an instance of {@link WaitListRepository} and returns it.
 */
function createWaitListRepository(): WaitListRepository {
  const prismaClient = new PrismaClient()

  return new PrismaWaitListRepository(prismaClient)
}

export default createWaitListRepository
