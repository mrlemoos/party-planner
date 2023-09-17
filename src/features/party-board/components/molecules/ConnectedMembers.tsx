"use client";

import { type JSX, useCallback } from "react";

import { ClipboardIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";

import AfloatRightBar from "@root/components/atoms/AfloatRightBar";
import Avatar from "@root/components/molecules/Avatar";
import Divider from "@root/components/atoms/Divider";
import IconButton from "@root/components/atoms/IconButton";
import SizedBox from "@root/components/atoms/SizedBox";
import Tooltip from "@root/components/atoms/Tooltip";
import useClipboard from "@root/hooks/useClipboard";
import useCurrentUser from "@root/hooks/useCurrentUser";
import getLinkToJoinParty from "@root/util/getLinkToJoinParty";

import usePartyBoardContext from "../../context-hooks/usePartyBoardContext";

export default function ConnectedMembers(): JSX.Element {
  const { members, ownerUserId } = usePartyBoardContext();
  const { userId } = useCurrentUser();
  const [, copy] = useClipboard();

  const params = useParams();

  const handleCopyJoinLinkToClipboard = useCallback(() => {
    const partyId = Array.isArray(params.partyId) ? params.partyId[0] : params.partyId;

    const hrefToJoin = getLinkToJoinParty(partyId, {
      as: "external",
      fromUserId: userId,
      entryType: "in-board-invitation-link",
      isUserPartyOwner: userId === ownerUserId,
    });

    copy(hrefToJoin);
  }, [params.partyId, userId, ownerUserId, copy]);

  return (
    <AfloatRightBar className='flex flex-col items-center'>
      <div className='mb-3'>
        <Tooltip content='Copy the invitation'>
          <IconButton
            alt='Click to copy the link to share with your scrummates!'
            className='w-8 h-8 flex justify-center items-center rounded-full'
            icon={<ClipboardIcon onClick={handleCopyJoinLinkToClipboard} height={18} width={18} />}
          />
        </Tooltip>
        <Divider />
        <SizedBox height={6} />
      </div>
      {members.map(({ displayName, userId }) => {
        const isPartyOwner = userId === ownerUserId;
        const key = `connected-members-avatar-${userId}-${isPartyOwner}-${displayName}`;

        return (
          <Avatar key={key} isPartyOwner={isPartyOwner} className='mb-2 motion-safe:animate-scale-in-content' userId={userId}>
            {displayName}
          </Avatar>
        );
      })}
    </AfloatRightBar>
  );
}
