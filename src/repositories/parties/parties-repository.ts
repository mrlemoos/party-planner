import PartyBoardModel from '@root/models/parties/party-board-model'
import PartyMemberModel from '@root/models/parties/party-member-model'
import PartyModel from '@root/models/parties/party-model'

/**
 * The abstract class (repository) which represents the parties repository.
 */
abstract class PartiesRepository {
  constructor(
    /**
     * The JWT access token of the client.
     */
    protected readonly accessToken: string,
  ) {}

  /**
   * This function creates a {@link PartyModel | party} with the given ID and (optionally) name, and then returns the
   * {@link PartyModel | party} that was created.
   *
   * NOTE: If no {@link partyName} is provided, then the {@link partyName} will be randomly generated.
   */
  abstract createParty(partyName?: string): Promise<PartyModel>
  /**
   * This function fetches a {@link PartyModel | party} with the given ID, and if it does not exist, it creates a
   * {@link PartyModel | party} with the given ID and (optionally) name, and then returns the {@link PartyModel | party}.
   *
   * NOTE: If the party does not exist and no {@link partyName} is provided, then the party will be created with a
   * randomly generated party name.
   */
  abstract fetchOrCreateParty(partyId: string, partyName?: string): Promise<PartyModel>
  /**
   * This function fetches the {@link PartyModel | party} identified by the given {@link partyId} and then returns the
   * {@link PartyModel | party object}. However, if the {@link PartyModel | party} does not exist, then this function
   * throws an error.
   */
  abstract fetchParty(partyId: string): Promise<PartyModel>
  /**
   * This function creates a {@link PartyBoard | party board} with the given ID and (optionally) name, and then returns
   * the {@link PartyBoard | party board} that was created.
   *
   * @see {@link PartyBoard | party board}
   * @see {@link PartyModel | party}
   */
  abstract renameParty(partyId: string, partyName: string): Promise<PartyModel>
  /**
   * This function fetches the {@link PartyMemberModel | members} of the {@link PartyModel | party} with the given ID, and
   * then returns the {@link PartyMemberModel | members}.
   */
  abstract fetchPartyMembers(partyId: string): Promise<PartyMemberModel[]>
  /**
   * This function fetches the {@link PartyMemberModel | member} of the {@link PartyModel | party} with the given {@link userId}
   * and then returns the {@link PartyMemberModel | member}.
   */
  abstract fetchPartyMemberByUserId(userId: string): Promise<PartyMemberModel>
  /**
   * This function creates a {@link PartyMemberModel | member} of the {@link PartyModel | party} with the given {@link userId}
   * and then returns the {@link PartyMemberModel | member}.
   */
  abstract createPartyMember(partyId: string, userId: string, userDisplayName: string): Promise<PartyMemberModel>
  /**
   * This function fetches the {@link PartyModel | party} with the given ID, and then returns the {@link PartyModel | party}.
   */
  abstract fetchPartyBoard(boardId: string): Promise<PartyBoardModel>
  /**
   * This function fetches all the {@link PartyModel | parties} and then returns the {@link PartyModel | parties}.
   */
  abstract fetchPartyBoardsByPartyId(partyId: string): Promise<PartyBoardModel[]>
}

export default PartiesRepository
