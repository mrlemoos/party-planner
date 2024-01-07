import ScrumTicketModel from '@root/models/scrum-ticket-model'

import CreatePartyResult from './create-party-result'
import CreatePartyDataTransferObject from './dto/create-party-data-transfer-object'
import RegisterTicketDataTransferObject from './dto/register-ticket-data-transfer-object'
import RenamePartyDataTransferObject from './dto/rename-party-data-transfer-object'

import PartiesRepository from './parties-repository'

function createPartiesRepository(): PartiesRepository {
  class $$_DO_NOT_USE_IN_PRODUCTION__PlaceholderClassPartiesRepository extends PartiesRepository {
    createParty(_dto: CreatePartyDataTransferObject): Promise<CreatePartyResult> {
      throw new Error('Method not implemented. See createParty() method call.')
    }
    renameParty(_dto: RenamePartyDataTransferObject): Promise<void> {
      throw new Error('Method not implemented. See renameParty() method call.')
    }
    registerTicket(_dto: RegisterTicketDataTransferObject): Promise<ScrumTicketModel> {
      throw new Error('Method not implemented. See registerTicket() method call.')
    }
  }

  return new $$_DO_NOT_USE_IN_PRODUCTION__PlaceholderClassPartiesRepository()
}

export default createPartiesRepository
