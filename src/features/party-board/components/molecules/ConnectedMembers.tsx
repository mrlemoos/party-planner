"use client";

import { type JSX, useCallback, Fragment } from "react";

import { ClipboardIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";

import AfloatRightBar from "@root/components/atoms/AfloatRightBar";
import Avatar from "@root/components/molecules/Avatar";
import Divider from "@root/components/atoms/Divider";
import IconButton from "@root/components/atoms/IconButton";
import SizedBox from "@root/components/atoms/SizedBox";
import OnlineBubble from "@root/components/molecules/OnlineBubble";
import Tooltip from "@root/components/atoms/Tooltip";
import useClipboard from "@root/hooks/useClipboard";
import useCurrentUser from "@root/hooks/useCurrentUser";
import getLinkToJoinParty from "@root/util/getLinkToJoinParty";

import usePartyBoardContext from "../../context-hooks/usePartyBoardContext";
import OfflineBubble from "@root/components/molecules/OfflineBubble";
import Skeleton from "@root/components/atoms/Skeleton";
import Pulse from "@root/components/atoms/Pulse";

export default function ConnectedMembers(): JSX.Element {
  const { members, ownerUserId, isLoading } = usePartyBoardContext();
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
        {isLoading ? (
          <Pulse className='h-10 flex justify-center items-center'>
            <Skeleton role='status' className='dark:bg-light-coal flex rounded-full' style={{ height: 18, width: 18 }} />
          </Pulse>
        ) : (
          <Tooltip content='Copy the invitation'>
            <IconButton
              alt='Click to copy the link to share with your scrummates!'
              className='w-8 h-8 flex justify-center items-center rounded-full'
              icon={<ClipboardIcon onClick={handleCopyJoinLinkToClipboard} height={18} width={18} />}
            />
          </Tooltip>
        )}
        <Divider />
        <SizedBox height={6} />
      </div>
      <Fragment>
        {isLoading ? (
          <Pulse className='flex flex-col items-center'>
            <Skeleton role='status' className='w-8 h-8 dark:bg-light-coal flex rounded-full' />
            <SizedBox height={6} />
            <Skeleton role='status' className='w-8 h-8 dark:bg-light-coal flex rounded-full' />
            <SizedBox height={6} />
            <Skeleton role='status' className='w-8 h-8 dark:bg-light-coal flex rounded-full' />
            <SizedBox height={6} />
            <Skeleton role='status' className='w-8 h-8 dark:bg-light-coal flex rounded-full' />
            <SizedBox height={6} />
            <Skeleton role='status' className='w-8 h-8 dark:bg-light-coal flex rounded-full' />
          </Pulse>
        ) : (
          <Fragment>
            {members.map(({ displayName, userId, status }) => {
              const isPartyOwner = userId === ownerUserId;
              const key = `connected-members-avatar-${userId}-${isPartyOwner}-${displayName}`;

              const isDisconnected = status === "Disconnected";

              return (
                <div key={key} className='relative'>
                  <Avatar
                    tooltipContent={
                      isDisconnected ? (
                        <span className='font-normal'>
                          <b>{displayName}</b> is offline
                        </span>
                      ) : (
                        displayName
                      )
                    }
                    isPartyOwner={isPartyOwner}
                    className={"mb-2 motion-safe:animate-scale-in-content"}
                    isDisabled={isDisconnected}
                    userId={userId}
                  >
                    {displayName}
                  </Avatar>
                  {isDisconnected ? (
                    <OfflineBubble className='absolute bottom-0 left-0' />
                  ) : (
                    <OnlineBubble className='absolute bottom-0 left-0' />
                  )}
                </div>
              );
            })}
          </Fragment>
        )}
      </Fragment>
    </AfloatRightBar>
  );
}
