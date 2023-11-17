import { randomUUID } from 'node:crypto'

import * as firebaseRealtimeDatabase from 'firebase-admin/database'

import CreatePartyResult from '@root/repositories/parties/create-party-result'
import PartiesRepository from '@root/repositories/parties/parties-repository'
import FirebaseAdminService from '@root/services/firebase-admin-service'
import CreatePartyDataTransferObject from '@root/repositories/parties/dto/create-party-data-transfer-object'

export default class FirebasePartiesRepository extends PartiesRepository {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {
    super()
  }

  private getRefPathname(uuid: string): `parties/${string}` {
    return `parties/${uuid}`
  }

  private getRandomUUID(): string {
    return randomUUID()
  }

  async createParty(dto: CreatePartyDataTransferObject): Promise<CreatePartyResult> {
    await dto.validate()

    const database = firebaseRealtimeDatabase.getDatabaseWithUrl(
      this.firebaseAdminService.REALTIME_DATABASE_URL ?? 'Not an URL',
    )
    const partyId = this.getRandomUUID()
    const path = this.getRefPathname(partyId)
    const ref = database.ref(path)

    const createdAt = new Date().toISOString()

    await ref.set(
      {
        partyOwnerUUID: dto.partyOwnerId,
        partyOwnerDisplayName: dto.partyOwnerDisplayName,
      },
      function (err) {
        if (err) {
          console.error(
            `(FirebasePartiesRepository) An error occurred while creating a party with ID "${partyId}":`,
            err,
          )
        }
      },
    )

    return {
      partyId,
      createdAt,
    }
  }
}
