"use client";

import { ReactNode, type JSX } from "react";

import { Root, Item, Header, Trigger, Content } from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import cls from "classnames";

// #region Interfaces & Types

type AccordionItem = {
  header: ReactNode;
  content: ReactNode;
};

interface AccordionProps {
  items: AccordionItem[];
}

// #endregion

export default function Accordion({ items }: AccordionProps): JSX.Element {
  return (
    <Root type="single" defaultValue="item-1" className={cls("space-y-4 w-full")}>
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
