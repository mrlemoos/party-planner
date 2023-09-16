"use client";

import { type ReactNode, type JSX, useCallback } from "react";

import { Root, Item, Header, Trigger, Content } from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import cls from "classnames";

// #region Utilities & Constants

/**
 * The class that is responsible for bearing the data about the change
 * in the controlled state passed to the Accordion component.
 *
 * An instance of `AccordionControlledStateEvent` is passed to the
 * {@link AccordionProps.onFocusChange} function when it is called by
 * the {@link Accordion} component that once the user changes the
 * focus to another mapped item.
 *
 * @see {@link AccordionItem}
 */
class AccordionControlledStateEvent<T extends string> {
  constructor(
    /**
     * The raw string value that corresponds to the key that is used
     * by the controlled state passed to the {@link Accordion}
     * component.
     *
     * This value is required so it is always defined for the event
     * object passed to the Accordion custom event handlers.
     *
     * @see {@link Accordion}
     * @see {@link AccordionItem.key}
     */
    public readonly rawValue: string,

    /**
     * The item -- typed by the {@link AccordionItem} interface -- that
     * is the one focused to the Accordion component.
     *
     * @see {@link AccordionItem}
     */
    public readonly item: AccordionItem<T>,

    /**
     * The list of all items which are defined in the {@link AccordionProps}
     * interface by the {@link AccordionProps.items} property.
     *
     * @see {@link AccordionItem}
     * @see {@link Accordion}
     * @see {@link AccordionProps}
     * @see {@link AccordionProps.items}
     */
    public readonly items: AccordionItem<T>[]
  ) {}
}

// #endregion

// #region Interfaces & Types

/**
 * The interface which corresponds to the function that is called
 * as {@link Accordion.onFocusChange} when the controlled state
 * has any update.
 *
 * @see {@link AccordionControlledStateEvent}
 */
interface AccordionControlledStateEventHandler<T extends string> {
  (event: AccordionControlledStateEvent<T>): void;
}

/**
 * The interface that corresponds to the item that is mapped by the Accordion
 * component before rendering each of the focusable items. It is also recommended
 * to provide the AccordionItem a key (that extends string) which corresponds
 * to the JSX key in the mapped element root.
 */
interface AccordionItem<T extends string> {
  header: ReactNode;
  content: ReactNode;
  key?: T;
}

interface AccordionProps<T extends string> {
  /**
   * An array of {@link AccordionItem} that are mapped through and it renders
   * each of them.
   *
   * @see {@link AccordionItem}
   */
  items: AccordionItem<T>[];

  /**
   * The actual and current value of the controlled state that defines
   * the {@link AccordionItem} to render as the focused element, and
   * if the {@link isCollapsible} is true, to open down the accordion item.
   *
   * @see {@link T}
   */
  value: T;

  /**
   * The classes that are forwarded to the root element of the Accordion
   * root element.
   */
  className?: string;

  /**
   * The boolean that determines whether or not the accordion items may be
   * collapsed and open.
   *
   * @default false
   */
  isCollapsible?: boolean;

  /**
   * The event handler dispatched when the user focuses on one item of the
   * Accordion, giving the {@link AccordionControlledStateEvent}.
   *
   * @see {@link AccordionControlledStateEventHandler}
   */
  onFocusChange?: AccordionControlledStateEventHandler<T>;
}

// #endregion

/**
 * The Accordion component relates to the props whose shape is defined by
 * the {@link AccordionProps} interface. Looping through the
 * {@link AccordionProps.items} property, the component renders the items
 * and supports creates the custom event handlers that provide the class
 * {@link AccordionControlledStateEvent} via the {@link AccordionControlledStateEventHandler}
 * function type.
 *
 * **⛳️ Note that** the Accordion component is rendered _only_ on the
 * client-side because it uses 3rd-party libraries that require of the
 * browser APIs.
 *
 * @see {@link AccordionProps}
 * @see {@link AccordionProps.items}
 * @see {@link AccordionControlledStateEvent}
 * @see {@link AccordionControlledStateEventHandler}
 */
function Accordion<T extends string>({
  items,
  value,
  onFocusChange,
  isCollapsible = false,
  className,
}: AccordionProps<T>): JSX.Element {
  const handleValueChange = useCallback((value: string) => {
    if (typeof onFocusChange === "function") {
      const item = items.find(({ key }) => key === value) ?? items[0];
      const event = new AccordionControlledStateEvent<T>(value, item, items);
      onFocusChange(event);
    }
  }, [items, onFocusChange]);

  return (
    <Root
      type="single"
      value={value}
      collapsible={isCollapsible}
      className={cls("space-y-4 w-full", className)}
      onValueChange={handleValueChange}
    >
      {items.map(({ header, content, key: key$ }) => {
        const key = String(key$);
        const isSelected = value === key;

        return (
          <Item
            key={key}
            value={key}
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

export default Accordion;
