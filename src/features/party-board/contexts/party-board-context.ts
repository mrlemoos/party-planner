import { createContext } from 'react'

import PartyBoardModel from '@root/models/parties/party-board-model'
import PartyMemberModel from '@root/models/parties/party-member-model'

interface PartyBoardContextType {
  boardId: string
  partyId: string
  partyName: string
  board: PartyBoardModel
  members: PartyMemberModel[]
}

const PartyBoardContext = createContext<PartyBoardContextType>({} as PartyBoardContextType)

export default PartyBoardContext
