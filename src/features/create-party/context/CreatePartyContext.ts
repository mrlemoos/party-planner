import { createContext } from 'react';

/* internal */ interface CreatePartyContextSchema {
  partyId: string;
  partyLink: string;
}

const CreatePartyContext = createContext<CreatePartyContextSchema | null>(null);

export default CreatePartyContext;
