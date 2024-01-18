import { type ComponentPropsWithoutRef } from 'react'

import PartyBoardProvider from './providers/party-board-provider'

/**
 * The props from the {@link PartyBoardProvider} component.
 */
type PartyBoardProviderProps = ComponentPropsWithoutRef<typeof PartyBoardProvider>

/**
 * The props for the {@link PartyBoardProvider} component with some omitted keys.
 */
type RememberedPartyBoardProviderProps = Omit<PartyBoardProviderProps, 'children'>

/**
 * The props for the {@link PartyBoard} component.
 */
interface PartyBoardProps extends RememberedPartyBoardProviderProps {
  /**
   * @ignore
   */
  children?: never
}

/**
 * The component that compounds the party board.
 */
function PartyBoard({ board, members, partyId, partyName, boardId }: PartyBoardProps): JSX.Element {
  return (
    <PartyBoardProvider board={board} members={members} partyId={partyId} partyName={partyName} boardId={boardId}>
      <span>
        Board ID: {boardId} &nbsp; Party ID: {partyId}
      </span>
    </PartyBoardProvider>
  )
}

export default PartyBoard
