"use client";

import { type ReactNode, type JSX, useCallback, useMemo } from "react";

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

  onFocusChange?: AccordionControlledStateEventHandler<T>;
}

// #endregion

export default function Accordion<T extends string>({ items, value, onFocusChange }: AccordionProps<T>): JSX.Element {
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
    <Root type="single" value={value} className={cls("space-y-4 w-full")} onValueChange={handleValueChange}>
      {items.map(({ header, content }, index) => {
        const value = `item-${index + 1}}`;

        return (
          <Item
            key={String(header)}
            value={value}
            className="rounded-lg focus-within:ring focus-within:ring-indigo-500 focus-within:ring-opacity-75 focus:outline-none w-full"
          >
            <Header className="w-full">
              <Trigger
                className={cls(
                  "radix-state-open:rounded-t-lg radix-state-closed:rounded-lg",
                  "focus:outline-none",
                  "inline-flex w-full items-center justify-between bg-white px-4 py-2 text-left dark:bg-gray-800"
                )}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{header}</span>
                <ChevronDownIcon
                  className={cls(
                    "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
                    "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                  )}
                />
              </Trigger>
            </Header>
            <Content className="pt-1 w-full rounded-b-lg bg-white px-4 pb-3 dark:bg-gray-800">
              <div className="text-sm text-gray-700 dark:text-gray-400">{content}</div>
            </Content>
          </Item>
        );
      })}
    </Root>
  );
}
