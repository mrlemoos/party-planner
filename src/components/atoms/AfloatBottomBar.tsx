import { type ReactNode, type JSX, HTMLAttributes } from 'react';

import cls from 'classnames';

// #region Interfaces & Types

type HTMLDivElementAttributes = HTMLAttributes<HTMLElement>;
type PickedHTMLDivElementAttributes = Pick<
  HTMLDivElementAttributes,
  'className' | 'style'
>;

interface AfloatBottomBarProps extends PickedHTMLDivElementAttributes {
  children: ReactNode;
}

// #endregion

export default function AfloatBottomBar({
  children,
  className,
  style,
}: AfloatBottomBarProps): JSX.Element {
  return (
    <div
      className={cls(
        'fixed bottom-8 left-[50%] translate-y-[50%] rounded-md bg-white shadow-2xl dark:bg-light-coal',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
