import { IsNotEmpty, Length } from 'class-validator'

import DataTransferObject from '@root/dto/data-transfer-object'

class CreatePartyDataTransferObject extends DataTransferObject {
  /**
   * The unique ID of the party owner.
   */
  @IsNotEmpty()
  public readonly partyOwnerId: string
  /**
   * The display name of the party owner. It must be between 1 and 32 characters long.
   */
  @IsNotEmpty()
  @Length(1, 32)
  public readonly partyOwnerDisplayName: string
  /**
   * The party name.
   */
  @IsNotEmpty()
  public readonly partyName: string

  constructor(partyOwnerId: string, partyOwnerDisplayName: string, partyName: string) {
    super()

    this.partyOwnerId = partyOwnerId
    this.partyOwnerDisplayName = partyOwnerDisplayName
    this.partyName = partyName
  }
}

export default CreatePartyDataTransferObject
