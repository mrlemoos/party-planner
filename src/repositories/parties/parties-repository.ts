import type CreatePartyResult from './create-party-result'
import type CreatePartyDataTransferObject from './dto/create-party-data-transfer-object'

abstract class PartiesRepository {
  /**
   * Creates a new party and returns an object with the {@link CreatePartyResult | party's metadata}.
   */
  abstract createParty(dto: CreatePartyDataTransferObject): Promise<CreatePartyResult>
}

export default PartiesRepository
