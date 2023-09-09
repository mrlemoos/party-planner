import { type CSSProperties, memo, type HTMLAttributes } from "react";

import toRem from "@root/util/toRem";

// #region Types & Interfaces

type WidthProp = CSSProperties["width"];
type HeightProp = CSSProperties["height"];

type SizedBoxProps = HTMLAttributes<HTMLDivElement> & {
  children?: never;

  width?: WidthProp;
  height?: HeightProp;
};

//#endregion

const SizedBox = memo<SizedBoxProps>(({ className, width: width$, height: height$, ...props }) => {
  const width = typeof width$ === "number" ? toRem(width$) : width$;
  const height = typeof height$ === "number" ? toRem(height$) : height$;

  return <div className={className} style={{ width, height }} {...props} />;
});

SizedBox.displayName = "SizedBox";

export default SizedBox;
