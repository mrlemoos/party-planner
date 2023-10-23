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
      className={cls('flex flex-col items-center justify-center', className)}
      {...props}
    >
      {hasPartyEmoji && (
        <div
          className={cls(
            'pointer-events-none text-2xl motion-safe:animate-bounce motion-reduce:hidden',
            emojiClassName,
          )}
        >
          🎉
        </div>
      )}
      <div className="pointer-events-none flex items-center">
        <Logo
          className={cls('mr-3 animate-bounce', logoClassName)}
          isMinimum={isLogoMinimum}
        />
        <span className="text-xl">{children}</span>
        <span className="animate-pulse text-3xl">...</span>
      </div>
    </div>
  );
}
