import { type ContextType, type ReactNode, type JSX } from "react";

import PartyBoardContext from "../contexts/PartyBoardContext";

type PartyBoardContextType = NonNullable<ContextType<typeof PartyBoardContext>>;

interface PartyBoardProviderProps extends PartyBoardContextType {
  children: ReactNode;
}

export default function PartyBoardProvider({ children, ...context }: PartyBoardProviderProps): JSX.Element {
  return <PartyBoardContext.Provider value={context}>{children}</PartyBoardContext.Provider>;
}
