import type CreatePartyResponseContract from "@root/contracts/parties/create/CreatePartyResponseContract";
import getEnv from "@root/util/getEnv";

const serverURL = getEnv("SERVER_URL");

interface CreatePartyOptions {
  token: string;
}

export default async function createParty({
  token,
}: CreatePartyOptions): Promise<CreatePartyResponseContract> {
  if (!token) {
    throw new Error("createParty(): You must be logged in to create a party.");
  }

  const meta = await fetch(`${serverURL}/parties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (await meta.json()) as CreatePartyResponseContract;
}
