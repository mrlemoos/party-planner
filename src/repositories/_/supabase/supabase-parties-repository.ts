import { randomUUID } from 'node:crypto'

import CreatePartyException from '@root/exceptions/create-party-exception'
import CreatePartyMemberException from '@root/exceptions/create-party-members-exception'
import DatabaseServiceException from '@root/exceptions/database-service-exception'
import PartiesNotFoundException from '@root/exceptions/parties-not-found-exception'
import PartyBoardsNotFoundException from '@root/exceptions/party-boards-not-found-exception'
import PartyMembersNotFoundException from '@root/exceptions/party-members-not-found-exception'
import RenamePartyException from '@root/exceptions/rename-party-exception'
import PartyBoardModel from '@root/models/parties/party-board-model'
import PartyMemberModel from '@root/models/parties/party-member-model'
import PartyModel from '@root/models/parties/party-model'
import PartiesRepository from '@root/repositories/parties/parties-repository'
import SupabaseService from '@root/services/supabase-service'
import { Database } from '@root/supabase'
import generateRandomName from '@root/util/generate-random-name'

type PartyTableShapeObject = Database['public']['Tables']['parties']['Row']

type PartyMemberTableShapeObject = Database['public']['Tables']['party_members']['Row']

type PartyBoardTableShapeObject = Database['public']['Tables']['party_boards']['Row']

/**
 * The Supabase implementation of the {@link PartiesRepository | parties repository}.
 */
class SupabasePartiesRepository extends PartiesRepository {
  /**
   * The {@link SupabaseService | Supabase service} used to interact with the Supabase database.
   */
  private readonly supabaseService = new SupabaseService()
  /**
   * The Supabase client instance created using the {@link this.clientAccessToken | client access token}.
   */
  private readonly supabaseClient = this.supabaseService.getClientSideSupabaseClient(this.accessToken)

  /**
   * The table names used in the Supabase database.
   */
  private readonly TABLE_NAMES = {
    parties: 'parties',
    partyMembers: 'party_members',
    partyBoards: 'party_boards',
  }

  async fetchParty(partyId: string): Promise<PartyModel> {
    const { data, error } = await this.supabaseClient
      .from(this.TABLE_NAMES.parties)
      .select()
      .eq('id', partyId)
      .single<PartyTableShapeObject>()

    if (error) {
      throw new DatabaseServiceException(
        `SupabasePartiesRepository(): It was not possible to fetch a party via fetchParty() due to the following error: "${error.message}"`,
        error.code,
      )
    }

    if (!data) {
      throw new PartiesNotFoundException(
        `SupabasePartiesRepository(): No data was returned when fetching a party via fetchParty("${partyId}"). See the call of fetchParty("${partyId}") for more information.`,
      )
    }

    const createdAt = new Date(data.created_at).toISOString()
    const model = new PartyModel(data.id, createdAt, data.party_name)

    return model
  }
  async fetchPartyMembers(partyId: string): Promise<PartyMemberModel[]> {
    const { data, error } = await this.supabaseClient
      .from(this.TABLE_NAMES.partyMembers)
      .select()
      .eq('party_id', partyId)
      .returns<PartyMemberTableShapeObject[]>()

    if (error) {
      throw new DatabaseServiceException(
        `SupabasePartiesRepository(): It was not possible to fetch party members via fetchPartyMembers() due to the following error: "${error.message}"`,
        error.code,
      )
    }

    if (!data) {
      throw new PartyMembersNotFoundException(
        `SupabasePartiesRepository(): No data was returned when fetching party members via fetchPartyMembers() by the given party ID (${partyId}). See the call of fetchPartyMembers() for more information.`,
      )
    }

    const models = data.map(
      ({ created_at, id, network_status, party_id: partyId, user_display_name: userDisplayName, user_id: userId }) => {
        const createdAt = new Date(created_at).toISOString()
        const networkStatus = network_status as 'Online' | 'Offline'

        return new PartyMemberModel(id, createdAt, userId, networkStatus, partyId, userDisplayName)
      },
    )

    return models
  }
  async fetchPartyMemberByUserId(userId: string): Promise<PartyMemberModel> {
    const { data, error } = await this.supabaseClient
      .from(this.TABLE_NAMES.partyMembers)
      .select()
      .eq('user_id', userId)
      .single<PartyMemberTableShapeObject>()

    if (error) {
      throw new DatabaseServiceException(
        `SupabasePartiesRepository(): It was not possible to fetch a party member by its userId (${userId}) due to the following error: "${error.message}"`,
        error.code,
      )
    }

    if (!data) {
      throw new PartyMembersNotFoundException(
        `SupabasePartiesRepository(): No data was returned when fetching a party member by its userId (${userId}). See the call of fetchPartyMemberByUserId() for more information.`,
      )
    }

    const createdAt = new Date(data.created_at).toISOString()
    const networkStatus = data.network_status as 'Online' | 'Offline'

    const model = new PartyMemberModel(
      data.id,
      createdAt,
      data.user_id,
      networkStatus,
      data.party_id,
      data.user_display_name,
    )

    return model
  }
  async createPartyMember(partyId: string, userId: string, userDisplayName: string): Promise<PartyMemberModel> {
    const id = randomUUID()
    const { data, error } = await this.supabaseClient
      .from(this.TABLE_NAMES.partyMembers)
      .insert({
        id,
        network_status: 'ONLINE',
        party_id: partyId,
        user_display_name: userDisplayName,
        user_id: userId,
      })
      .select('id,created_at,network_status,party_id,user_display_name,user_id')
      .single<PartyMemberTableShapeObject>()

    if (error) {
      throw new DatabaseServiceException(
        `SupabasePartiesRepository(): It was not possible to create a party member via createPartyMember() due to the following error: "${error.message}"`,
        error.code,
      )
    }

    if (!data) {
      throw new CreatePartyMemberException(
        'SupabasePartiesRepository(): No data was returned when creating a party member via createPartyMember(). See the call of createPartyMember() for more information.',
      )
    }

    const { created_at, network_status } = data
    const createdAt = new Date(created_at).toISOString()
    const networkStatus = network_status as 'Online' | 'Offline'

    const model = new PartyMemberModel(
      id,
      createdAt,
      data.user_id,
      networkStatus,
      data.party_id,
      data.user_display_name,
    )

    return model
  }
  async fetchPartyBoard(boardId: string): Promise<PartyBoardModel> {
    const { data, error } = await this.supabaseClient
      .from(this.TABLE_NAMES.partyBoards)
      .select('id,party_id,board_name,created_at,focused_ticket_id')
      .eq('id', boardId)
      .single<PartyBoardTableShapeObject>()

    if (error) {
      throw new DatabaseServiceException(
        `SupabasePartiesRepository(): It was not possible to fetch a party board via fetchPartyBoard() due to the following error: "${error.message}"`,
        error.code,
      )
    }

    if (!data) {
      throw new PartyBoardsNotFoundException(
        'SupabasePartiesRepository(): No data was returned when fetching a party board via fetchPartyBoard(). See the call of fetchPartyBoard() for more information.',
      )
    }

    const { id, created_at, party_id: partyId, board_name: boardName, focused_ticket_id: focusedTicketId } = data
    const createdAt = new Date(created_at).toISOString()

    const model = new PartyBoardModel(id, createdAt, partyId, boardName, focusedTicketId)

    return model
  }
  async fetchPartyBoardsByPartyId(partyId: string): Promise<PartyBoardModel[]> {
    const { data, error } = await this.supabaseClient
      .from(this.TABLE_NAMES.partyBoards)
      .select('id,party_id,board_name,focused_ticket_id,created_at')
      .eq('party_id', partyId)
      .returns<PartyBoardTableShapeObject[]>()

    if (error) {
      throw new DatabaseServiceException(
        `SupabasePartiesRepository(): It was not possible to fetch party boards via fetchPartyBoardsByPartyId("${partyId}") due to the following error: "${error.message}"`,
        error.code,
      )
    }

    if (!data) {
      throw new PartyBoardsNotFoundException(
        `SupabasePartiesRepository(): No data was returned when fetching party boards via fetchPartyBoardsByPartyId("${partyId}"). See the call of fetchPartyBoardsByPartyId() for more information.`,
      )
    }

    const models = data.map(
      ({ board_name: boardName, created_at, focused_ticket_id: focusedTicketId, id, party_id: partyId }) =>
        new PartyBoardModel(id, new Date(created_at).toISOString(), partyId, boardName, focusedTicketId),
    )

    return models
  }
  async createParty(partyName?: string | undefined): Promise<PartyModel> {
    const id = randomUUID()
    const coercedPartyName = partyName ?? generateRandomName()

    const { data, error } = await this.supabaseClient
      .from(this.TABLE_NAMES.parties)
      .insert<Database['public']['Tables']['parties']['Insert']>({ id, party_name: coercedPartyName })
      .select('id,created_at,party_name')
      .single()

    if (error) {
      throw new DatabaseServiceException(
        `SupabasePartiesRepository(): It was not possible to create a party via createParty() due to the following error: "${error.message}"`,
        error.code,
      )
    }

    if (!data) {
      throw new CreatePartyException(
        'SupabasePartiesRepository(): No data was returned when creating a party via createParty(). See the call of createParty() for more information.',
      )
    }

    const model = new PartyModel(data.id, data.created_at, data.party_name)

    return model
  }
  async fetchOrCreateParty(partyId: string, partyName?: string | undefined): Promise<PartyModel> {
    const coercedPartyName = partyName ?? generateRandomName()

    const { data, error } = await this.supabaseClient
      .from(this.TABLE_NAMES.parties)
      .upsert({
        id: partyId,
        party_name: coercedPartyName,
      })
      .select('id,created_at,party_name')
      .single<PartyTableShapeObject>()

    if (error) {
      throw new DatabaseServiceException(
        `SupabasePartiesRepository(): It was not possible to create a party via fetchOrCreateParty(${partyId}", "${partyName}") due to the following error: "${error.message}"`,
        error.code,
      )
    }

    if (!data) {
      throw new CreatePartyException(
        `SupabasePartiesRepository(): No data was returned when creating/fetching a party via fetchOrCreateParty("${partyId}", "${partyName}"). See the call of fetchOrCreateParty() for more information.`,
      )
    }

    const model = new PartyModel(data.id, data.created_at, data.party_name)

    return model
  }

  async renameParty(partyId: string, partyName: string): Promise<PartyModel> {
    const { data, error } = await this.supabaseClient
      .from(this.TABLE_NAMES.parties)
      .update({ party_name: partyName })
      .eq('id', partyId)
      .select('id,created_at,party_name')
      .single<PartyTableShapeObject>()

    if (error) {
      throw new DatabaseServiceException(
        `SupabasePartiesRepository(): It was not possible to rename a party via renameParty("${partyId}", "${partyName}") due to the following error: "${error.message}"`,
        error.code,
      )
    }

    if (!data) {
      throw new RenamePartyException(
        `SupabasePartiesRepository(): No data was returned when renaming a party via renameParty("${partyId}", "${partyName}"). See the call of renameParty() for more information.`,
      )
    }

    const model = new PartyModel(data.id, data.created_at, data.party_name)

    return model
  }
}

export default SupabasePartiesRepository
