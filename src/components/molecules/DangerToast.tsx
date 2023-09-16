"use client";

import { type HTMLAttributes, type ReactNode, type ReactElement, type ButtonHTMLAttributes } from "react";

import cls from "classnames";

import Icon from "@root/components/atoms/Icon";

type DangerToastProps = HTMLAttributes<HTMLDivElement> & {
  header: ReactNode;
  headerClassName?: string;

  action: ReactNode;
  actionClassName?: string;
};

function DangerToast({ header, headerClassName, children, action, actionClassName, className, ...props }: DangerToastProps): JSX.Element {
  return (
    <div className={cls("md:w-[420px] flex flex-col gap-y-1 bg-white px-2 py-1 rounded-lg", className)} {...props}>
      <div className='flex items-center gap-1 text-rose-800'>
        <Icon name='Mini XMark' height={18} width={18} />
        <span className={cls("font-semibold text-md", headerClassName)}>{header}</span>
      </div>
      <div className='flex items-center gap-2 text-black ml-6'>
        <span className='font-normal text-sm flex-1'>{children}</span>
        <div className={cls("flex items-center text-sm gap-1 mb-1", actionClassName)}>{action}</div>
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
      className,
    )}
    type='button'
  >
    {children}
  </button>
);

Action.displayName = "DangerToast.Action";

DangerToast.Action = Action;

export default DangerToast;
