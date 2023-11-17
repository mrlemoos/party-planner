import { type WaitList } from '@prisma/client/edge'

import type RegisterEmailToWaitListDataTransferObject from '@root/dto/register-email-to-wait-list.dto'

abstract class WaitListRepository {
  /**
   * The method to fetch all people in the wait list.
   *
   * @see {@link WaitList}
   *
   * @returns {WaitList[]}
   */
  abstract fetchAllPeopleWaiting(): Promise<WaitList[]>
  /**
   * Registers an email address to the wait list and returns the newly created wait list {@link WaitList entry}.
   *
   * @see {@link WaitList}
   * @see {@link RegisterEmailToWaitListDataTransferObject}
   */
  abstract registerEmailToWaitList(dto: RegisterEmailToWaitListDataTransferObject): Promise<WaitList>
}

export default WaitListRepository
