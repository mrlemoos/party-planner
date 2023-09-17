import type JoinPartyResponseContract from '@root/contracts/parties/join/JoinPartyResponseContract';
import getEnv from '@root/util/getEnv';

const serverURL = getEnv("SERVER_URL");

interface JoinPartyOptions {
  token: string;
}

export default async function joinParty(partyId: string, { token }: JoinPartyOptions): Promise<JoinPartyResponseContract> {
  if (!token) {
    throw new Error('joinParty(): You must be logged in to join a party.');
  }
  
  const meta = await fetch(`${serverURL}/parties/${partyId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  
  return (await meta.json()) as JoinPartyResponseContract;
}