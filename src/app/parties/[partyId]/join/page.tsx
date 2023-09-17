import { type JSX } from "react";

import { redirectToSignIn } from "@clerk/nextjs";
import { type Metadata } from "next";

import Logo from "@root/components/atoms/Logo";
import joinParty from "@root/services/joinParty";
import JoinParty from "@root/features/join-party/JoinParty";
import getSessionToken from "@root/util/getSessionToken";

interface JoinPartyParams {
  partyId: string;
}

interface JoinPartySearchParams {
  lang?: string;
}

interface JoinPartyPageProps {
  params: JoinPartyParams;
  searchParams: JoinPartySearchParams;
}

const defaultSearchParams: JoinPartySearchParams = {
  lang: "en",
};

export const metadata: Metadata = {
  title: "🎉 Joining the party...",
};

export default async function JoinPartyPage({
  params: { partyId },
  searchParams: { lang = "en" } = defaultSearchParams,
}: JoinPartyPageProps): Promise<JSX.Element> {
  const token = getSessionToken();

  if (!token) {
    return redirectToSignIn({
      returnBackUrl: `/parties/${partyId}/join`,
    });
  }

  const response = await joinParty(partyId, { token });

  const error = "message" in response && typeof response.message === "string" ? response.message : undefined;

  return (
    <html lang={lang}>
      <body>
        <JoinParty error={error} />
        <div className='fixed right-8 top-8'>
          <Logo isMinimum={true} />
        </div>
      </body>
    </html>
  );
}
