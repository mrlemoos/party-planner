import { HTMLAttributes, type JSX } from "react";

import cls from "classnames";

type AfloatRightBarProps = HTMLAttributes<HTMLDivElement>;

export default function AfloatRightBar({ children, className, ...props }: AfloatRightBarProps): JSX.Element {
  return (
    <div
      className={cls(
        "z-30",
        "shadow-xl dark:shadow-md rounded-2xl bg-white dark:bg-coal dark:text-white",
        "border border-gray-200 dark:border-gray-700",
        "hidden md:block fixed right-3 top-[30%] w-16 px-4 py-3 min-h-[300px] max-h-screen",
        "animate-slide-left-fade",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
