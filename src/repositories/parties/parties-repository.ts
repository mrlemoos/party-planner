import type ScrumTicketModel from '@root/models/scrum-ticket-model'

import type CreatePartyResult from './create-party-result'
import type CreatePartyDataTransferObject from './dto/create-party-data-transfer-object'
import type RegisterTicketDataTransferObject from './dto/register-ticket-data-transfer-object'
import type RenamePartyDataTransferObject from './dto/rename-party-data-transfer-object'

abstract class PartiesRepository {
  /**
   * Creates a new party and returns an object with the {@link CreatePartyResult | party's metadata}.
   */
  abstract createParty(dto: CreatePartyDataTransferObject): Promise<CreatePartyResult>
  /**
   * Renames a party given the {@link RenamePartyDataTransferObject | data transfer object}.
   */
  abstract renameParty(dto: RenamePartyDataTransferObject): Promise<void>
  /**
   * Registers a ticket given the {@link RegisterTicketDataTransferObject | data transfer object}.
   */
  abstract registerTicket(dto: RegisterTicketDataTransferObject): Promise<ScrumTicketModel>
}

export default PartiesRepository
