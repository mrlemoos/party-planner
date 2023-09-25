import { type JSX, type HTMLAttributes } from 'react';

import cls from 'classnames';

import Logo from './Logo';

interface LoadingProps extends HTMLAttributes<HTMLElement> {
  hasPartyEmoji?: boolean;
  emojiClassName?: string;
  isLogoMinimum?: boolean;
  logoClassName?: string;
}

export default function Loading({
  className,
  hasPartyEmoji,
  emojiClassName,
  children = 'Loading',
  isLogoMinimum = false,
  logoClassName,
  ...props
}: LoadingProps): JSX.Element {
  return (
    <div
      className={cls('flex flex-col justify-center items-center', className)}
      {...props}
    >
      {hasPartyEmoji && (
        <div
          className={cls(
            'motion-safe:animate-bounce motion-reduce:hidden text-2xl pointer-events-none',
            emojiClassName,
          )}
        >
          🎉
        </div>
      )}
      <div className="flex items-center pointer-events-none">
        <Logo
          className={cls('animate-bounce mr-3', logoClassName)}
          isMinimum={isLogoMinimum}
        />
        <span className="text-xl">{children}</span>
        <span className="animate-pulse text-3xl">...</span>
      </div>
    </div>
  );
}
