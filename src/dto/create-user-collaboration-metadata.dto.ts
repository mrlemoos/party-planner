import { IsHexColor, IsNotEmpty } from 'class-validator'

import DataTransferObject from './data-transfer-object'

export default class CreateUserCollaborationMetadataDto extends DataTransferObject {
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

  constructor(userId: string, avatarBackgroundColor: string, avatarForegroundColor: string) {
    super()
    this.userId = userId
    this.avatarBackgroundColor = avatarBackgroundColor
    this.avatarForegroundColor = avatarForegroundColor
  }
}
