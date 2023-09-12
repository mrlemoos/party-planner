"use client";

import { type ReactNode, type HTMLAttributes, type JSX } from "react";

import {
  Provider,
  Root,
  Trigger,
  Content,
  Arrow,
  type TooltipContentProps as ContentProps,
  type TooltipProps as RootProps,
  type TooltipProviderProps as ProviderProps,
} from "@radix-ui/react-tooltip";
import cls from "classnames";

// #region Types & Interfaces

type PickedContentProps = Pick<ContentProps, "align" | "alignOffset" | "side" | "sideOffset">;
type PickedRootProps = Pick<RootProps, "onOpenChange" | "disableHoverableContent" | "defaultOpen" | "open">;
type PickedProviderProps = Pick<ProviderProps, "skipDelayDuration" | "delayDuration">;
type HTMLElementAttributes = HTMLAttributes<HTMLElement>;
type OmittedHTMLElementAttributes = "children" | "content";
type HTMLElementAttributesWithOmittedAttributes = Omit<HTMLElementAttributes, OmittedHTMLElementAttributes>;

interface TooltipProps
  extends PickedContentProps,
    PickedRootProps,
    PickedProviderProps,
    HTMLElementAttributesWithOmittedAttributes {
  children: ReactNode;
  content: ReactNode;
}

// #endregion

export default function Tooltip({
  children,
  content,
  align = "center",
  alignOffset,
  side = "top",
  sideOffset = 4,
  delayDuration = 700,
  skipDelayDuration,
  onOpenChange,
  disableHoverableContent,
  defaultOpen,
  open,
  className,
  ...props
}: TooltipProps): JSX.Element {
  return (
    <Provider skipDelayDuration={skipDelayDuration} delayDuration={delayDuration}>
      <Root
        onOpenChange={onOpenChange}
        disableHoverableContent={disableHoverableContent}
        defaultOpen={defaultOpen}
        open={open}
      >
        <Trigger asChild={true}>{children}</Trigger>
        <Content
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
          className={cls(
            "radix-side-top:animate-slide-down-fade",
            "radix-side-right:animate-slide-left-fade",
            "radix-side-bottom:animate-slide-up-fade",
            "radix-side-left:animate-slide-right-fade",
            "inline-flex items-center rounded-md px-4 py-2",
            "rounded-md shadow-xl cursor-default",
            "text-xs",
            "bg-coal text-white",
            "dark:bg-white dark:text-coal",
            className
          )}
          {...props}
        >
          <Arrow
            className={cls(
              "fill-current shadow-2xl",
              "stroke-coal text-black",
              "dark:stroke-gray-200 dark:text-gray-100"
            )}
          />
          {content}
        </Content>
      </Root>
    </Provider>
  );
}
