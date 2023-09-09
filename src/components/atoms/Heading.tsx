import { ElementType, HTMLAttributes, type JSX } from "react";

import cls from "classnames";

// #region Interfaces & Types

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HTMLElementAttributes = HTMLAttributes<HTMLHeadingElement>;

interface HeadingProps extends HTMLElementAttributes {
  level: HeadingLevel;
}

// #endregion

export default function Heading({ level, children, className, ...props }: HeadingProps): JSX.Element {
  const HeadingElement = level as ElementType;

  return (
    <HeadingElement className={cls("user-select-none font-medium mt-3", className)} {...props}>
      {children}
    </HeadingElement>
  );
}
