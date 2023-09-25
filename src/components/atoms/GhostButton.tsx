import { forwardRef, type ButtonHTMLAttributes, type JSX } from 'react';

import cls from 'classnames';

type GhostButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const GhostButton = forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ children, className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      className={cls(
        'p-0 m-0 outline-none border-none bg-transparent',
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  ),
);

GhostButton.displayName = 'GhostButton';

export default GhostButton;
