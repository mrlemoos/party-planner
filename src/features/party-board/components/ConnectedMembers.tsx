import { type JSX } from "react";

import AfloatRightBar from "@root/components/atoms/AfloatRightBar";
import Avatar from "@root/components/molecules/Avatar";

import usePartyBoardContext from "../context-hooks/usePartyBoardContext";

export default function ConnectedMembers(): JSX.Element {
  const { members, ownerUserId } = usePartyBoardContext();

  return (
    <AfloatRightBar>
      {members.map(({ displayName, userId }) => {
        const isPartyOwner = userId === ownerUserId;

        return (
          <Avatar key={userId} isPartyOwner={isPartyOwner}>
            {displayName}
          </Avatar>
        );
      })}
    </AfloatRightBar>
  );
}
