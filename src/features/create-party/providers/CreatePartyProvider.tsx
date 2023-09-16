import { type ContextType, type ReactNode } from "react";

import CreatePartyContext from "../context/CreatePartyContext";

type CreatePartyProviderProps = ContextType<typeof CreatePartyContext> & {
  children: ReactNode;
};

export default function CreatePartyProvider({ children, ...context }: CreatePartyProviderProps): JSX.Element {
  return <CreatePartyContext.Provider value={context}>{children}</CreatePartyContext.Provider>;
}
