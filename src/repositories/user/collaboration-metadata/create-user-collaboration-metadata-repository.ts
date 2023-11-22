import PrismaUserCollaborationMetadataRepository from '@root/repositories/_/prisma/prisma-user-collaboration-metadata-repository'

import UserCollaborationMetadataRepository from './user-collaboration-metadata-repository'

/**
 * Creates a new instance of the {@link UserCollaborationMetadataRepository} abstraction and returns it.
 */
export default function createUserCollaborationMetadataRepository(): UserCollaborationMetadataRepository {
  return new PrismaUserCollaborationMetadataRepository()
}
