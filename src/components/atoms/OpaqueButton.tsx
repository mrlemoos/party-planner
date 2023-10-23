import { type JSX, type ButtonHTMLAttributes, type ReactNode } from 'react';

import cls from 'classnames';

interface OpaqueButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function OpaqueButton({
  children,
  className,
  type = 'button',
  ...props
}: OpaqueButtonProps): JSX.Element {
  return (
    <button
      {...props}
      type={type}
      className={cls(
        className,
        'px-4 py-2',
        'rounded-md font-medium decoration-inherit transition',
        'bg-purple-100 text-purple-800 hover:shadow-sm',
        'dark:bg-purple-800 dark:text-purple-100',
      )}
    >
      {children}
    </button>
  );
}
