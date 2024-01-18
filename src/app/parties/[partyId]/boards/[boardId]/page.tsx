import { redirectToSignIn } from '@clerk/nextjs'

import PartyBoard from '@root/features/party-board/party-board'
import type PartyBoardModel from '@root/models/parties/party-board-model'
import type PartyMemberModel from '@root/models/parties/party-member-model'
import createPartiesRepository from '@root/repositories/parties/create-parties-repository'
import createAuthRepository from '@root/repositories/auth/create-auth-repository'

const authRepo = createAuthRepository()

/**
 * The interface which shapes the object passed down to the {@link fetchPartyBoard | `fetchPartyBoard()`} function.
 */
interface FetchComplexPartyObjectParams {
  /**
   * @see {@link PartyBoardByBoardIdPageParams.partyId}
   */
  partyId: string
  /**
   * @see {@link PartyBoardByBoardIdPageParams.boardId}
   */
  boardId: string
  /**
   * The JWT which contains the user's access token to access the information of both the party and board.
   */
  userAccessToken: string
}

interface ComplexPartyObject {
  board: PartyBoardModel
  members: PartyMemberModel[]
  partyId: string
  boardId: string
  partyName: string
}

/**
 * This function fetches the party and board data from via the repository layer and returns an object to populate the
 * user interface (UI) with.
 *
 * @see {@link ComplexPartyObject}
 */
async function fetchComplexPartyObject({
  partyId,
  boardId,
  userAccessToken,
}: FetchComplexPartyObjectParams): Promise<ComplexPartyObject> {
  const partiesRepo = createPartiesRepository(userAccessToken)

  // NOTE: Information such as the "createdAt" field returned by the fetchPartyBoard() method can be used to improve the
  // user experience (UX) by displaying the date and time the party was created or creating special events with it. Just
  // something to keep the eye on in the near future.
  const [board, members, party] = await Promise.all([
    partiesRepo.fetchPartyBoard(boardId),
    partiesRepo.fetchPartyMembers(partyId),
    partiesRepo.fetchParty(partyId),
  ])

  const { name: partyName } = party

  return {
    board,
    members,
    partyId,
    boardId,
    partyName,
  }
}

interface PartyBoardByBoardIdPageParams {
  /**
   * The ID of the party to which this board belongs.
   */
  partyId: string
  /**
   * The ID of the board.
   */
  boardId: string
}

interface PartyBoardByBoardIdPageProps {
  /**
   * @see {@link PartyBoardByBoardIdPageParams}
   */
  params: PartyBoardByBoardIdPageParams
}

async function PartyBoardByBoardIdPage({
  params: { boardId, partyId },
}: PartyBoardByBoardIdPageProps): Promise<JSX.Element> {
  const currentUser = await authRepo.currentUser()

  if (!currentUser?.token) {
    const returnBackURL = `/parties/${partyId}/boards/${boardId}`

    return redirectToSignIn({ returnBackUrl: returnBackURL })
  }

  const userAccessToken = currentUser.token

  const { board, members, partyName } = await fetchComplexPartyObject({
    partyId,
    boardId,
    userAccessToken,
  })

  return <PartyBoard board={board} partyId={partyId} boardId={boardId} members={members} partyName={partyName} />
}

export default PartyBoardByBoardIdPage
