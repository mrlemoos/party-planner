import { type ReactElement } from "react";

import { redirectToSignIn } from "@clerk/nextjs";

import CreateParty from "@root/features/create-party/CreateParty";
import createParty from "@root/services/createParty";
import getSessionToken from "@root/util/getSessionToken";

export default async function CreatePartyPage(): Promise<ReactElement> {
  const token = getSessionToken();

  if (!token) {
    return redirectToSignIn({
      returnBackUrl: "/parties/create",
    });
  }

  const { partyId } = await createParty({ token });

  return <CreateParty partyId={partyId} />;
}
