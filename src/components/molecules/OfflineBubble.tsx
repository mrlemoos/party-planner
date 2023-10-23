import { type JSX, type HTMLAttributes } from 'react';

import cls from 'classnames';

import Bubble from '@root/components/atoms/Bubble';

// #region Interfaces & Types

type HTMLElementAttributes = HTMLAttributes<HTMLElement>;

interface OfflineBubbleProps extends HTMLElementAttributes {
  /** @ignore */
  children?: never;
}

// #endregion

function OfflineBubble({
  className,
  'aria-label': ariaLabel$ = 'Offline',
  ...props
}: OfflineBubbleProps): JSX.Element {
  return (
    <Bubble
      aria-label={ariaLabel$}
      className={cls('border-gray-500 bg-rose-500', className)}
      {...props}
    />
  );
}

export default OfflineBubble;
