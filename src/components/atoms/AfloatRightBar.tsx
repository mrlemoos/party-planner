import { HTMLAttributes, type JSX } from "react";

import cls from "classnames";

type AfloatRightBarProps = HTMLAttributes<HTMLDivElement>;

export default function AfloatRightBar({ children, className, ...props }: AfloatRightBarProps): JSX.Element {
  return (
    <div
      className={cls(
        "shadow-xl rounded-2xl bg-white dark:bg-coal dark:text-white",
        "border-[1px] border-gray-200 dark:border-gray-700",
        "hidden md:block fixed right-6 top-[30%] w-16 px-4 py-3 min-h-[300px]",
        "flex flex-col justify-center gap-3",
        "animate-slide-left-fade",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
