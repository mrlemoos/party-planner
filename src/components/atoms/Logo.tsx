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
        'text-sm rounded-full py-2 cursor-pointer border border-transparent',
        isMinimum
          ? 'w-8 h-8 flex items-center justify-center bg-purple-100 text-lg'
          : 'px-3 py-2 bg-purple-800 text-white relative',
        'transition-all',
        'dark:bg-purple-800 dark:border-white',
        {
          'hover:shadow-2xl hover:bg-white hover:scale-110 hover:text-black':
            isInteractive,
        },
        'flex items-center gap-3',
        Poppins.className,
        className,
      )}
      {...props}
    >
      {!isMinimum && (
        <span className={cls('absolute text-2xl -top-3 -right-3 -order-1')}>
          🎉
        </span>
      )}
      {isMinimum ? '🎉' : 'Party Planner'}
    </span>
  );
}

export default Logo;
