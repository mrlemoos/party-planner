import { randomUUID } from 'node:crypto'

import { child, ref, getDatabase, set, get, DataSnapshot } from 'firebase/database'

import type CreatePartyResult from '@root/repositories/parties/create-party-result'
import PartiesRepository from '@root/repositories/parties/parties-repository'
import CreatePartyDataTransferObject from '@root/repositories/parties/dto/create-party-data-transfer-object'
import type UserCollaborationMetadataModel from '@root/models/user-collaboration-metadata-model'
import CreateUserCollaborationMetadataDto from '@root/dto/create-user-collaboration-metadata.dto'
import getRandomAvatarColorMatch from '@root/util/get-random-avatar-color-match'
import RegisterTicketDataTransferObject from '@root/repositories/parties/dto/register-ticket-data-transfer-object'
import type ScrumTicketModel from '@root/models/scrum-ticket-model'
import FirebaseClientService from '@root/services/firebase-client-service'
import UserCollaborationMetadataRepository from '@root/repositories/user/collaboration-metadata/user-collaboration-metadata-repository'
import type PartyModel from '@root/models/party-model'
import generateInternalTicketId from '@root/util/generate-internal-ticket-id'
import convertFirebaseObjectToArray from '@root/util/convert-firebase-object-to-array'
import RenamePartyDataTransferObject from '@root/repositories/parties/dto/rename-party-data-transfer-object'

class FirebasePartiesRepository extends PartiesRepository {
  constructor(
    private readonly firebaseClientService: FirebaseClientService,
    private readonly userCollaborationMetadataRepository: UserCollaborationMetadataRepository,
  ) {
    super()
  }

  private getRefPathname(uuid: string): `parties/${string}` {
    return `parties/${uuid}`
  }

  /**
   * @internal
   *
   * Generates a party ID with a random UUID.
   */
  private generatePartyId(): string {
    return randomUUID()
  }

  /**
   * @internal
   *
   * Generates a ticket ID with the pattern that Planria can use to identify that it has been created by the server. See
   * more at {@link generateInternalTicketId | `generateInternalTicketId()`}.
   *
   * @see {@link generateInternalTicketId}
   */
  private generateTicketId(): string {
    return generateInternalTicketId()
  }

  /**
   * @internal
   *
   * Creates a new {@link UserCollaborationMetadataModel | user collaboration metadata} if it does not exist yet. If it
   * does, it fetches it from the database.
   */
  private async createAndOrFetchUserCollaborationMetadata(
    userId: string,
    userDisplayName: string,
    partyId: string,
  ): Promise<UserCollaborationMetadataModel> {
    try {
      return await this.userCollaborationMetadataRepository.fetchUserCollaborationMetadataByUserId(userId)
    } catch (error) {
      if (error) {
        console.error(`Failed to fetch user collaboration metadata for user ID "${userId}".`, error)
      }

      const { backgroundColor: avatarBackgroundColor, foregroundColor: avatarForegroundColor } =
        getRandomAvatarColorMatch()
      const dto = new CreateUserCollaborationMetadataDto(
        userId,
        avatarBackgroundColor,
        avatarForegroundColor,
        userDisplayName,
        partyId,
      )

      return await this.userCollaborationMetadataRepository.createUserCollaborationMetadata(dto)
    }
  }

  /**
   * @inheritdoc
   */
  async createParty(dto: CreatePartyDataTransferObject): Promise<CreatePartyResult> {
    await dto.validate()

    const partyId = this.generatePartyId()

    const app = await this.firebaseClientService.singleton()
    const database = getDatabase(app)
    const databaseRef = ref(database)
    const partyReference = child(databaseRef, this.getRefPathname(partyId))

    const createdAt = new Date().toISOString()

    const {
      createdAt: userCollaborationMetadataCreatedAtDate,
      updatedAt: userCollaborationMetadataUpdatedAtDate,
      ...userCollaborationMetadata
    } = await this.createAndOrFetchUserCollaborationMetadata(dto.partyOwnerId, dto.partyOwnerDisplayName, partyId)

    const userCollaborationMetadataCreatedAt = userCollaborationMetadataCreatedAtDate.toISOString()
    const userCollaborationMetadataUpdatedAt = userCollaborationMetadataUpdatedAtDate.toISOString()

    const partyOwnerMember = {
      ...userCollaborationMetadata,
      createdAt: userCollaborationMetadataCreatedAt,
      updatedAt: userCollaborationMetadataUpdatedAt,
    }

    const party: PartyModel = {
      id: partyId,
      name: dto.partyName,
      partyMembers: [partyOwnerMember],
      tickets: [],
      createdAt,
      updatedAt: createdAt,
    }

    await set(partyReference, party)

    return {
      createdAt,
      partyId,
    }
  }

  /**
   * @inheritdoc
   */
  async renameParty(dto: RenamePartyDataTransferObject): Promise<void> {
    await dto.validate()

    const app = await this.firebaseClientService.singleton()
    const database = getDatabase(app)
    const databaseRef = ref(database)
    const partyReference = child(databaseRef, this.getRefPathname(dto.partyId))

    const partySnapshot = await get(partyReference)
    const party = this.transformDataSnapshotIntoPartyModel(partySnapshot)

    const updatedAt = new Date().toISOString()

    const newParty: PartyModel = {
      ...party,
      name: dto.newName,
      updatedAt,
    }

    await set(partyReference, newParty)
  }

  /**
   * @internal
   *
   * Transforms a Firebase {@link DataSnapshot} into a {@link PartyModel} by converting the arrays from the Firebase
   * object into actual arrays. That because Firebase stores arrays as objects with the index as the key, which is not
   * array in JavaScript and, therefore, not iterable.
   */
  private transformDataSnapshotIntoPartyModel(snapshot: DataSnapshot): PartyModel {
    const value = snapshot.val()

    const partyMembers = value?.partyMembers ? convertFirebaseObjectToArray(value.partyMembers) : []
    const tickets = value?.tickets ? convertFirebaseObjectToArray(value.tickets) : []

    return {
      ...value,
      partyMembers,
      tickets,
    }
  }

  /**
   * @inheritdoc
   */
  async registerTicket(dto: RegisterTicketDataTransferObject): Promise<ScrumTicketModel> {
    await dto.validate()

    const ticketId = dto.ticketId ?? this.generateTicketId()

    const app = await this.firebaseClientService.singleton()
    const database = getDatabase(app)
    const databaseRef = ref(database)
    const partyReference = child(databaseRef, this.getRefPathname(dto.partyId))

    const partySnapshot = await get(partyReference)
    const party = this.transformDataSnapshotIntoPartyModel(partySnapshot)

    const updatedAt = new Date().toISOString()

    const ticket: ScrumTicketModel = {
      id: ticketId,
      summary: dto.ticketSummary,
      createdAt: updatedAt,
      updatedAt,
    }

    const tickets = Array.isArray(party?.tickets) ? [...party.tickets, ticket] : [ticket]

    const newParty: PartyModel = {
      ...party,
      tickets,
      updatedAt,
    }

    await set(partyReference, newParty)

    return ticket
  }
}

export default FirebasePartiesRepository
