"use client";

import { type HTMLAttributes, type ReactNode, type JSX } from "react";

import cls from "classnames";

import Tooltip from "@root/components/atoms/Tooltip";

interface AvatarProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content to render inside the avatar. If a string is provided, only the
   * first character will be rendered.
   *
   * @see {@link ReactNode}
   */
  children: ReactNode;

  /**
   * The custom content to render in the tooltip. If not provided, the
   * {@link children} prop will be used.
   *
   * @see {@link ReactNode}
   */
  tooltipContent?: ReactNode;

  /**
   * Given true, this property will render a crown emoji over the user's avatar
   * to indicate that they are the party owner.
   *
   * @default false
   *
   * @see {@link crownClassName}
   */
  isPartyOwner?: boolean;

  /**
   * This property is used to apply a custom class name to the crown emoji.
   *
   * Note that this property is only used given the {@link isPartyOwner}
   * property is `true`.
   *
   * @see {@link isPartyOwner}
   */
  crownClassName?: string;
}

/**
 * The `Avatar` component is used to render a user's avatar. This component
 * supports rendering a crown emoji over the user's avatar to indicate that they
 * are the party owner.
 *
 * It renders a random background color and the first character of the user's
 * display name.
 */
export default function Avatar({
  children,
  className,
  isPartyOwner = false,
  crownClassName,
  tooltipContent,
  ...props
}: AvatarProps): JSX.Element {
  return (
    <Tooltip
      side="left"
      sideOffset={4}
      content={tooltipContent ?? <span className="font-medium text-sm">{children}</span>}
    >
      <div
        className={cls(
          "w-8 h-8 rounded-full border-[1px] border-coal dark:border-white",
          "bg-yellow-300 text-black font-bold flex justify-center items-center cursor-default",
          { relative: isPartyOwner },
          className
        )}
        {...props}
      >
        {isPartyOwner && (
          <span className={cls("absolute -top-6 text-2xl", crownClassName)}>👑</span>
        )}
        {typeof children === "string" ? <span>{children.charAt(0).toUpperCase()}</span> : children}
      </div>
    </Tooltip>
  );
}
