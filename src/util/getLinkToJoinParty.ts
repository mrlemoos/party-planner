'use client';

import getClientURL from './getClientURL';

interface GetLinkToJoinPartyOptions {
  as?: 'relative' | 'external';
  fromUserId?: string | null;
  isUserPartyOwner?: boolean;
  entryType?: 'in-board-invitation-link' | 'create-party-link';
}

interface GetLinkToJoinPartyFunction {
  (partyId: string, options?: GetLinkToJoinPartyOptions): string;
}

const getLinkToJoinParty: GetLinkToJoinPartyFunction = (
  partyId,
  { as = 'relative', fromUserId, isUserPartyOwner, entryType } = {},
) => {
  const searchParams = new URLSearchParams();

  if (fromUserId) {
    searchParams.set('fromUserId', fromUserId);
  }

  if (isUserPartyOwner) {
    searchParams.set('isUserPartyOwner', 'true');
  }

  if (entryType) {
    searchParams.set('entryType', entryType);
  }

  const pathname = `/parties/${partyId}/join`;

  const links = {
    relative: pathname,
    external: `${getClientURL()}${pathname}?${searchParams.toString()}`,
  };

  return links[as];
};

export default getLinkToJoinParty;
