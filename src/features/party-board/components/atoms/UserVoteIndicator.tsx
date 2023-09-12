import { type CSSProperties, type JSX } from "react";

import Tooltip from "@root/components/atoms/Tooltip";
import toRem from "@root/util/toRem";

// #region Constants

const backgroundColor = "#ffd700";

const style: CSSProperties = {
  height: toRem(12),
  width: toRem(12),

  top: 16,
  right: 16,

  backgroundColor,
};

// #endregion

export default function UserVoteIndicator(): JSX.Element {
  return (
    <Tooltip content="Your vote" side="top" sideOffset={18}>
      <div className="absolute rounded-full cursor-help z-[1]" style={style} />
    </Tooltip>
  );
}
