import { PrismaClient, type WaitList } from '@prisma/client'

import type RegisterEmailToWaitListDataTransferObject from '@root/dto/register-email-to-wait-list.dto'
import WaitListRepository from '@root/repositories/wait-list/wait-list-repository'

class PrismaWaitListRepository extends WaitListRepository {
  constructor(private readonly prisma: PrismaClient) {
    super()
  }
  async fetchAllPeopleWaiting(): Promise<WaitList[]> {
    return this.prisma.waitList.findMany()
  }
  async registerEmailToWaitList({ email }: RegisterEmailToWaitListDataTransferObject): Promise<WaitList> {
    return this.prisma.waitList.create({
      data: {
        email,
      },
    })
  }
}

export default PrismaWaitListRepository
