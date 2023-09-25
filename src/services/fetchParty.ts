import type GetPartyByIdResponseContract from '@root/contracts/parties/by-party-id/GetPartyByIdResponseContract';
import getEnv from '@root/util/getEnv';

const serverURL = getEnv('SERVER_URL');

interface FetchPartyByIdOptions {
  token: string;
}

export default async function fetchParty({
  token,
}: FetchPartyByIdOptions): Promise<GetPartyByIdResponseContract> {
  if (!token) {
    throw new Error('fetchParty(): You must be logged in to fetch a party.');
  }

  const meta = await fetch(`${serverURL}/parties`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await meta.json();

  if (Object.values(response).length === 0) {
    return null;
  }

  return response;
}
