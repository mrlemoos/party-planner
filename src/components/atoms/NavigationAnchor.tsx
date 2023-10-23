import {
  type ReactNode,
  type ReactElement,
  type AnchorHTMLAttributes,
} from 'react';

import Link, { type LinkProps } from 'next/link';
import cls from 'classnames';

interface NavigationAnchorProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children: ReactNode;
}

const NavigationAnchor = ({
  children,
  className,
  ...props
}: NavigationAnchorProps): ReactElement => (
  <Link
    className={cls(
      className,
      'px-4 py-2',
      'rounded-md text-sm font-medium decoration-inherit transition',
      'bg-purple-100 text-purple-800 hover:shadow-sm',
      'dark:bg-purple-800 dark:text-purple-100',
    )}
    {...props}
  >
    {children}
  </Link>
);

export default NavigationAnchor;
