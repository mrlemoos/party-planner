import { type ReactElement, type HTMLAttributes } from "react";

import cls from "classnames";

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  children?: never;
};

const Divider = ({ className, ...props }: DividerProps): ReactElement => (
  <div
    className={cls("border-t border-gray-200 dark:border-gray-800", className)}
    {...props}
  />
);

export default Divider;
