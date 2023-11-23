import WaitListRepository from './wait-list-repository'
import PrismaWaitListRepository from '../_/prisma/prisma-wait-list-repository'

/**
 * Creates an instance of {@link WaitListRepository} and returns it.
 */
function createWaitListRepository(): WaitListRepository {
  return new PrismaWaitListRepository()
}

export default createWaitListRepository
