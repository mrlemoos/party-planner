import { type HTMLAttributes, type JSX } from "react";

import cls from "classnames";

type SkeletonProps = HTMLAttributes<HTMLElement>;

function Skeleton({ children, className, role = "status", ...props }: SkeletonProps): JSX.Element {
  return <div role={role} {...props} className={cls("bg-gray-300 dark:bg-light-coal pointer-events-none", className)} />;
}

export default Skeleton;
