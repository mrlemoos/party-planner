"use client";

import getClientURL from "./getClientURL";

interface GetLinkToJoinPartyOptions {
  as?: "relative" | "external";
  fromUserId?: string | null;
  isUserPartyOwner?: boolean;
  entryType?: "in-board-invitation-link" | "create-party-link";
}

function getLinkToJoinParty(
  partyId: string,
  { as = "relative", fromUserId, isUserPartyOwner, entryType }: GetLinkToJoinPartyOptions = {}
): string {
  const searchParams = new URLSearchParams();

  if (fromUserId) {
    searchParams.set("fromUserId", fromUserId);
  }

  if (isUserPartyOwner) {
    searchParams.set("isUserPartyOwner", "true");
  }

  if (entryType) {
    searchParams.set("entryType", entryType);
  }

  const pathname = `/parties/${partyId}/join`;

  const links = {
    relative: pathname,
    external: `${getClientURL()}${pathname}`,
  };

  return links[as];
}

export default getLinkToJoinParty;
