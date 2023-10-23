import { LiHTMLAttributes, type JSX } from 'react';

import cls from 'classnames';

type ListItemProps = LiHTMLAttributes<HTMLLIElement>;

export default function ListItem({
  children,
  className,
  ...props
}: ListItemProps): JSX.Element {
  return (
    <li className={cls('flex list-none', className)} {...props}>
      {children}
    </li>
  );
}
