import { type JSX, type HTMLAttributes } from 'react';

import cls from 'classnames';

// #region Interfaces & Types

type HTMLElementAttributes = HTMLAttributes<HTMLElement>;

interface BubbleProps extends HTMLElementAttributes {
  /** @ignore */
  children?: never;
}

// #endregion

function Bubble({
  className,
  'aria-label': ariaLabel$ = 'Online',
  ...props
}: BubbleProps): JSX.Element {
  return (
    <div
      aria-label={ariaLabel$}
      className={cls('h-3 w-3 rounded-full border', className)}
      {...props}
    />
  );
}

export default Bubble;
