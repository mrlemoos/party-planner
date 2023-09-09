import { LiHTMLAttributes, type JSX } from "react";

import cls from "classnames";

type ListItemProps = LiHTMLAttributes<HTMLLIElement>;

export default function ListItem({ children, className, ...props }: ListItemProps): JSX.Element {
  return (
    <li className={cls("list-none flex", className)} {...props}>
      {children}
    </li>
  );
}
