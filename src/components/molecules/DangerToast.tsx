"use client";

import { type HTMLAttributes, type ReactNode, type ReactElement, type ButtonHTMLAttributes } from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import cls from "classnames";

interface DangerToastProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The custom {@link ReactNode} that corresponds to the header area of the
   * danger toast. By default, it renders this prop inside of a `<span>` tag
   * with the text weight set to `semibold` and the text size slightly larger
   * than the content ({@link children}). It is recommended to use a string
   * literal for this prop.
   *
   * @see {@link ReactNode}
   * @see {@link children}
   */
  header: ReactNode;

  /**
   * The custom {@link ReactNode} that corresponds to the actions area of the
   * danger toast. This node or nodes are rendered inside of a `<div>` tag with
   * the flexbox layout and some small gap between the children. It is
   * recommended to use a button-like component or native HTML element for this
   * prop, such as {@link DangerToast.Action}.
   *
   * If it is necessary to render more than one element inside of the actions,
   * it is recommended to wrap them in a `<Fragment>` component so the layout
   * remains consistent.
   *
   * @see {@link ReactNode}
   */
  action: ReactNode;
}

function DangerToast({ header, children, action, className, ...props }: DangerToastProps): JSX.Element {
  return (
    <div className={cls("md:w-[420px] flex flex-col gap-y-1 bg-white px-2 py-1 rounded-lg", className)} {...props}>
      <div className='flex items-center gap-1 text-rose-800'>
        <Cross2Icon height={18} width={18} />
        <span className={cls("font-semibold text-md")}>{header}</span>
      </div>
      <div className='flex items-center gap-2 text-black ml-6'>
        <span className='font-normal text-sm flex-1'>{children}</span>
        <div className={cls("flex items-center text-sm gap-1 mb-1")}>{action}</div>
      </div>
    </div>
  );
}

type ActionProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

const Action = ({ children, className, ...props }: ActionProps): ReactElement => (
  <button
    {...props}
    className={cls(
      "bg-gray-200 text-gray-800 px-2 py-1 rounded-md",
      "hover:bg-gray-300 hover:text-gray-950",
      "transition-colors duration-200 ease-in-out",
      className
    )}
    type='button'
  >
    {children}
  </button>
);

Action.displayName = "DangerToast.Action";

DangerToast.Action = Action;

export default DangerToast;
