import { ContextType, useContext } from 'react';

import CreatePartyContext from '../context/CreatePartyContext';

export default function useCreatePartyContext(): NonNullable<
  ContextType<typeof CreatePartyContext>
> {
  return useContext(CreatePartyContext)!;
}
