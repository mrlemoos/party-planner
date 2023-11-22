import { type WaitList } from '@prisma/client'

import type RegisterEmailToWaitListDataTransferObject from '@root/dto/register-email-to-wait-list.dto'
import WaitListRepository from '@root/repositories/wait-list/wait-list-repository'
import PrismaService from '@root/services/prisma-service'

class PrismaWaitListRepository extends WaitListRepository {
  private readonly PRISMA_CLIENT = PrismaService.client()

  async fetchAllPeopleWaiting(): Promise<WaitList[]> {
    return this.PRISMA_CLIENT.waitList.findMany()
  }
  async registerEmailToWaitList({ email }: RegisterEmailToWaitListDataTransferObject): Promise<WaitList> {
    return this.PRISMA_CLIENT.waitList.create({
      data: {
        email,
      },
    })
  }
}

export default PrismaWaitListRepository
