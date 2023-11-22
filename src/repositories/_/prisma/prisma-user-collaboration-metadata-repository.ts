import { type UserCollaborationMetadata } from '@prisma/client'

import CreateUserCollaborationMetadataDto from '@root/dto/create-user-collaboration-metadata.dto'
import UserCollaborationMetadataByUserIdNotFoundException from '@root/repositories/user/collaboration-metadata/user-collaboration-metadata-by-user-id-not-found-exception'
import UserCollaborationMetadataNotFoundException from '@root/repositories/user/collaboration-metadata/user-collaboration-metadata-not-found-exception'
import UserCollaborationMetadataRepository from '@root/repositories/user/collaboration-metadata/user-collaboration-metadata-repository'
import PrismaService from '@root/services/prisma-service'

export default class PrismaUserCollaborationMetadataRepository extends UserCollaborationMetadataRepository {
  private readonly PRISMA_CLIENT = PrismaService.client()

  async fetchUserCollaborationMetadata(userCollaborationMetadataId: string): Promise<UserCollaborationMetadata> {
    const meta = await this.PRISMA_CLIENT.userCollaborationMetadata.findUnique({
      where: {
        id: userCollaborationMetadataId,
      },
    })

    if (!meta) {
      throw new UserCollaborationMetadataNotFoundException(userCollaborationMetadataId)
    }

    return meta
  }
  async fetchUserCollaborationMetadataByUserId(userId: string): Promise<UserCollaborationMetadata> {
    const meta = await this.PRISMA_CLIENT.userCollaborationMetadata.findFirst({
      where: {
        userId,
      },
    })
    if (!meta) {
      throw new UserCollaborationMetadataByUserIdNotFoundException(userId)
    }

    return meta
  }
  async createUserCollaborationMetadata(dto: CreateUserCollaborationMetadataDto): Promise<UserCollaborationMetadata> {
    await dto.validate()

    const meta = await this.PRISMA_CLIENT.userCollaborationMetadata.create({
      data: dto,
    })

    return meta
  }
}
