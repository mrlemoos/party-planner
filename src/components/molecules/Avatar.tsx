"use client";

import { type HTMLAttributes, type ReactNode, type JSX, type ComponentProps } from "react";

import cls from "classnames";

import Tooltip from "@root/components/atoms/Tooltip";

// #region Interfaces & Types

type TooltipProps = ComponentProps<typeof Tooltip>;
type TooltipSide = TooltipProps["side"];

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

  /**
   * This property is used to apply a custom size to the avatar.
   *
   * @default 'medium'
   */
  size?: "small" | "medium";

  /**
   * The side of the avatar that the {@link Tooltip} renders on.
   *
   * @default 'left'
   *
   * @see {@link TooltipSide}
   * @see {@link TooltipProps}
   */
  tooltipSide?: TooltipSide;
}

// #endregion

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
  size = "medium",
  tooltipSide = "left",
  ...props
}: AvatarProps): JSX.Element {
  return (
    <Tooltip
      side={tooltipSide}
      sideOffset={4}
      content={
        tooltipContent ?? (
          <span className={cls("font-medium", size === "small" ? "text-xs" : "text-sm")}>{children}</span>
        )
      }
    >
      <div
        className={cls(
          "rounded-full border-[1px] border-coal dark:border-white",
          "bg-yellow-300 text-black font-bold flex justify-center items-center cursor-default",
          { relative: isPartyOwner },
          size === "small" ? "w-6 h-6 text-xs" : "w-8 h-8",
          className
        )}
        {...props}
      >
        {isPartyOwner && (
          <span className={cls("absolute -top-5 -right-1 text-2xl rotate-[20deg]", crownClassName)}>👑</span>
        )}
        {typeof children === "string" ? (
          <span
            className={cls({
              "text-xs": size === "small",
            })}
          >
            {children.charAt(0).toUpperCase()}
          </span>
        ) : (
          children
        )}
      </div>
    </Tooltip>
  );
}
