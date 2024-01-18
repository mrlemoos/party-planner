'use client'

import { ContextType, useMemo, type ReactNode } from 'react'

import PartyBoardContext from '../contexts/party-board-context'

type PartyBoardContextType = ContextType<typeof PartyBoardContext>

/**
 * The props for the {@link PartyBoardProvider} component.
 */
interface PartyBoardProviderProps extends PartyBoardContextType {
  /**
   * The {@link ReactNode | node} to render as the children of the provider.
   */
  children: ReactNode
}

/**
 * The provider for the {@link PartyBoardContext}.
 */
function PartyBoardProvider({
  children,
  board,
  members,
  partyId,
  partyName,
  boardId,
}: PartyBoardProviderProps): JSX.Element {
  const memoizedValue = useMemo(
    () => ({ board, members, partyId, partyName, boardId }),
    [board, members, partyId, partyName, boardId],
  )

  return <PartyBoardContext.Provider value={memoizedValue}>{children}</PartyBoardContext.Provider>
}

export default PartyBoardProvider
