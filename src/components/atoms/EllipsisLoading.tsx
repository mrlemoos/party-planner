import { HTMLAttributes } from "react";

import cls from "classnames";

type EllipsisLoadingProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children?: never;
  containerClassName?: string;
};

export default function EllipsisLoading({ className, containerClassName, ...props }: EllipsisLoadingProps): JSX.Element {
  return (
    <div className={cls("flex justify-center items-center gap-x-1", containerClassName)} {...props}>
      <div className={cls("h-2.5 w-2.5 bg-gray-400 rounded-full animate-pulse", className)} />
      <div className={cls("h-2.5 w-2.5 bg-gray-400 rounded-full animate-pulse", className)} />
      <div className={cls("h-2.5 w-2.5 bg-gray-400 rounded-full animate-pulse", className)} />
    </div>
  );
}
