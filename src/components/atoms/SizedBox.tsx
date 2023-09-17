import { type CSSProperties, memo, type HTMLAttributes, type JSX } from "react";

import toRem from "@root/util/toRem";

// #region Types & Interfaces

type WidthProp = CSSProperties["width"];
type HeightProp = CSSProperties["height"];

interface SizedBoxProps extends HTMLAttributes<HTMLDivElement> {
  /** @ignore */
  children?: never;

  /**
   * The number (in pixels) of the width of the SizedBox. If not passed, it
   * defaults to `undefined`.
   */
  width?: WidthProp;
  /**
   * The number (in pixels) of the height of the SizedBox. If not passed, it
   * defaults to `undefined`.
   */
  height?: HeightProp;
}

//#endregion

function SizedBox$({
  className,
  height: height$,
  width: width$,
  "aria-hidden": ariaHidden$ = "true",
  ...props
}: SizedBoxProps): JSX.Element {
  const width = typeof width$ === "number" ? toRem(width$) : width$;
  const height = typeof height$ === "number" ? toRem(height$) : height$;

  return <div className={className} style={{ width, height }} aria-hidden={ariaHidden$} {...props} />;
}

const SizedBox = memo(SizedBox$) as typeof SizedBox$;

export default SizedBox;
