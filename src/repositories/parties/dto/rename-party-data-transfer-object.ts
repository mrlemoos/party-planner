import { IsNotEmpty } from 'class-validator'

import DataTransferObject from '@root/dto/data-transfer-object'

/**
 * The data transfer object for renaming a party.
 */
class RenamePartyDataTransferObject extends DataTransferObject {
  /**
   * The identifier of the party to rename.
   */
  @IsNotEmpty()
  public readonly partyId!: string

  /**
   * The new name of the party.
   */
  @IsNotEmpty()
  public readonly newName!: string

  constructor(partyId: string, newName: string) {
    super()
    this.partyId = partyId
    this.newName = newName
  }
}

export default RenamePartyDataTransferObject
