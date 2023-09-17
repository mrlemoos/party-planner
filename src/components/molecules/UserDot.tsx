import { memo } from "react";

import Tooltip from "@root/components/atoms/Tooltip";
import useCachedUserAvatarAppearance from "@root/hooks/useCachedUserAvatarAppearance";

interface UserDotProps {
  userId: string;
  userDisplayName: string;
}

const UserDot = memo(({ userId, userDisplayName }: UserDotProps) => {
  const { getUserAvatarAppearance } = useCachedUserAvatarAppearance();

  const { backgroundColor, foregroundColor } = getUserAvatarAppearance(userId, { orDefaultsTo: "random" });

  const tooltipId = `${userId}-user-dot-tooltip`;

  return (
    <Tooltip content={userDisplayName} id={tooltipId} side='bottom'>
      <div className='h-2 w-2 rounded-md' style={{ backgroundColor, color: foregroundColor }} aria-labelledby={tooltipId} />
    </Tooltip>
  );
});

UserDot.displayName = "UserDot";

export default UserDot;
