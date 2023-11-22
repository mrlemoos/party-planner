import { type UserCollaborationMetadata } from '@prisma/client'

import CreateUserCollaborationMetadataDto from '@root/dto/create-user-collaboration-metadata.dto'

export default abstract class UserCollaborationMetadataRepository {
  /**
   * Fetches the {@link UserCollaborationMetadata | user collaboration metadata} of the user  and returns the object
   * with the user collaboration metadata.
   */
  abstract fetchUserCollaborationMetadata(userCollaborationMetadataId: string): Promise<UserCollaborationMetadata>
  /**
   * Fetches the list of {@link UserCollaborationMetadata | user collaboration metadata} of the user with the given id
   * and returns the list of user collaboration metadata.
   */
  abstract fetchUserCollaborationMetadataByUserId(userId: string): Promise<UserCollaborationMetadata>
  /**
   * Creates a new {@link UserCollaborationMetadata | user collaboration metadata} with the given data and returns the
   * object with the user collaboration metadata.
   */
  abstract createUserCollaborationMetadata(dto: CreateUserCollaborationMetadataDto): Promise<UserCollaborationMetadata>
}
