import { IsHexColor, IsNotEmpty, IsOptional } from 'class-validator'

import type UserCollaborationMetadataModel from '@root/models/user-collaboration-metadata-model'

import DataTransferObject from './data-transfer-object'

/**
 * The user collaboration metadata model without the id.
 */
type RememberedUserCollaborationMetadataModel = Omit<UserCollaborationMetadataModel, 'id' | 'updatedAt' | 'createdAt'>

export default class CreateUserCollaborationMetadataDto
  extends DataTransferObject
  implements RememberedUserCollaborationMetadataModel
{
  /**
   * The id of the user that will be associated with the user collaboration metadata.
   */
  @IsNotEmpty()
  public readonly userId: string
  /**
   * The (background) color that will identify the user in the collaboration sessions and history.
   */
  @IsNotEmpty()
  @IsHexColor({
    message: 'avatarBackgroundColor must be a valid hexadecimal color',
  })
  public readonly avatarBackgroundColor: string
  /**
   * The (foreground) color that will identify the user in the collaboration sessions and history.
   */
  @IsNotEmpty()
  @IsHexColor({
    message: 'avatarForegroundColor must be a valid hexadecimal color',
  })
  public readonly avatarForegroundColor: string
  /**
   * The display name that will identify the user to other users in the collaboration.
   */
  @IsNotEmpty()
  public readonly displayName: string
  /**
   *
   */
  @IsOptional()
  public readonly partyId: string | null

  constructor(
    userId: string,
    avatarBackgroundColor: string,
    avatarForegroundColor: string,
    displayName: string,
    partyId: string | null,
  ) {
    super()
    this.userId = userId
    this.avatarBackgroundColor = avatarBackgroundColor
    this.avatarForegroundColor = avatarForegroundColor
    this.displayName = displayName
    this.partyId = partyId
  }
}
