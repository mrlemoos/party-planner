import { type HTMLAttributes } from 'react';

import cls from 'classnames';

import Poppins from '@root/styles/Poppins';

type LogoProps = HTMLAttributes<HTMLElement> & {
  children?: never;
  isInteractive?: boolean;
  isMinimum?: boolean;
};

function Logo({
  className,
  isInteractive = false,
  isMinimum = false,
  ...props
}: LogoProps): JSX.Element {
  return (
    <span
      className={cls(
        'cursor-pointer rounded-full border border-transparent py-2 text-sm',
        isMinimum
          ? 'flex h-8 w-8 items-center justify-center bg-purple-100 text-lg'
          : 'relative bg-purple-800 px-3 py-2 text-white',
        'transition-all',
        'dark:border-white dark:bg-purple-800',
        {
          'hover:scale-110 hover:bg-white hover:text-black hover:shadow-2xl':
            isInteractive,
        },
        'flex items-center gap-3',
        Poppins.className,
        className,
      )}
      {...props}
    >
      {!isMinimum && (
        <span className={cls('absolute -right-3 -top-3 -order-1 text-2xl')}>
          🎉
        </span>
      )}
      {isMinimum ? '🎉' : 'Party Planner'}
    </span>
  );
}

export default Logo;
