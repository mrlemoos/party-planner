"use client";

import { type ReactNode, type JSX, useCallback } from "react";

import { Root, Item, Header, Trigger, Content } from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import cls from "classnames";

// #region Utilities & Constants

class AccordionControlledStateEvent<T extends string> {
  constructor(
    public readonly rawValue: string,
    public readonly item: AccordionItem<T>,
    public readonly items: AccordionItem<T>[]
  ) {}
}

// #endregion

// #region Interfaces & Types

interface AccordionControlledStateEventHandler<T extends string> {
  (event: AccordionControlledStateEvent<T>): void;
}

type AccordionItem<T extends string> = {
  header: ReactNode;
  content: ReactNode;
  key?: T;
};

interface AccordionProps<T extends string> {
  items: AccordionItem<T>[];
  value: T;

  className?: string;

  isCollapsible?: boolean;

  onFocusChange?: AccordionControlledStateEventHandler<T>;
}

// #endregion

export default function Accordion<T extends string>({
  items,
  value,
  onFocusChange,
  isCollapsible = false,
  className,
}: AccordionProps<T>): JSX.Element {
  const handleValueChange = useCallback(
    function handleValueChange$(value: string) {
      const item = items.find(({ key }) => key === value) ?? items[0];
      const event = new AccordionControlledStateEvent<T>(value, item, items);

      if (typeof onFocusChange === "function") {
        onFocusChange(event);
      }
    },
    [items, onFocusChange]
  );

  return (
    <Root
      type="single"
      value={value}
      collapsible={isCollapsible}
      className={cls("space-y-4 w-full", className)}
      onValueChange={handleValueChange}
    >
      {items.map(({ header, content, key }) => {
        const isSelected = value === key;

        return (
          <Item
            key={String(key)}
            value={String(key)}
            className={cls(
              "border-l border-t border-r border-transparent rounded-t-lg",
              {
                "dark:bg-light-coal bg-gray-100": isSelected,
              },
              "transition-all focus-within:animate-slide-up-fade"
            )}
          >
            <Header className="w-full">
              <Trigger className={cls("inline-flex w-full items-center justify-between px-4 py-3 text-left")}>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{header}</span>
                <ChevronDownIcon
                  className={cls(
                    "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                    "group-radix-state-open:rotate-180 group-radix-state-open:duration-300",
                    {
                      "rotate-180": isSelected,
                    }
                  )}
                />
              </Trigger>
            </Header>
            <Content className="pt-1 w-full px-4 pb-3 animate-scale-in-content">
              <div className="text-sm text-gray-700 dark:text-gray-400">{content}</div>
            </Content>
          </Item>
        );
      })}
    </Root>
  );
}
