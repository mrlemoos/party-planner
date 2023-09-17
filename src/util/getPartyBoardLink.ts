"use client";

import getClientURL from "./getClientURL";

interface GetPartyBoardLinkOptions {
  as?: "relative" | "external";
}

function getPartyBoardLink(partyId: string, { as = "relative" }: GetPartyBoardLinkOptions = {}): string {
  const pathname = `/parties/${partyId}/board`;

  const links = {
    relative: pathname,
    external: `${getClientURL()}${pathname}`,
  };

  return links[as];
}

export default getPartyBoardLink;
