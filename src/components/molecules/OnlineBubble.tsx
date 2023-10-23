import { type JSX, type HTMLAttributes } from 'react';

import cls from 'classnames';

import Bubble from '@root/components/atoms/Bubble';

// #region Interfaces & Types

type HTMLElementAttributes = HTMLAttributes<HTMLElement>;

interface OnlineBubbleProps extends HTMLElementAttributes {
  /** @ignore */
  children?: never;
}

// #endregion

function OnlineBubble({
  className,
  'aria-label': ariaLabel$ = 'Online',
  ...props
}: OnlineBubbleProps): JSX.Element {
  return (
    <Bubble
      aria-label={ariaLabel$}
      className={cls('border-green-500 bg-green-500', className)}
      {...props}
    />
  );
}

export default OnlineBubble;
