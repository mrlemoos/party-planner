import { ContextType, useContext } from "react";

import PartyBoardContext from "../contexts/PartyBoardContext";

export default function usePartyBoardContext(): NonNullable<ContextType<typeof PartyBoardContext>> {
  const context = useContext(PartyBoardContext);

  return context!;
}
