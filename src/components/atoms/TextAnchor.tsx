import { type AnchorHTMLAttributes, type JSX } from 'react';

import cls from 'classnames';
import Link, { type LinkProps } from 'next/link';

type TextAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

export default function TextAnchor({
  children,
  className,
  ...props
}: TextAnchorProps): JSX.Element {
  return (
    <Link
      className={cls(
        'px-2 py-1 font-medium decoration-transparent',
        'border-b-2 border-b-transparent text-purple-900',
        'hover:border-b-purple-300',
        'dark:text-purple-200',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
