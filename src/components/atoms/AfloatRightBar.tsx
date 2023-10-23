import { HTMLAttributes, type JSX } from 'react';

import cls from 'classnames';

type AfloatRightBarProps = HTMLAttributes<HTMLDivElement>;

export default function AfloatRightBar({
  children,
  className,
  ...props
}: AfloatRightBarProps): JSX.Element {
  return (
    <div
      className={cls(
        'z-30',
        'rounded-2xl bg-white shadow-xl dark:bg-coal dark:text-white dark:shadow-md',
        'border border-gray-200 dark:border-gray-700',
        'fixed right-3 top-[30%] hidden max-h-screen min-h-[300px] w-16 px-4 py-3 md:block',
        'animate-slide-left-fade',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
