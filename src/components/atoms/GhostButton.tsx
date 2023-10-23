import { forwardRef, type ButtonHTMLAttributes, type JSX } from 'react';

import cls from 'classnames';

type GhostButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const GhostButton = forwardRef<HTMLButtonElement, GhostButtonProps>(
  ({ children, className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      className={cls(
        'm-0 border-none bg-transparent p-0 outline-none',
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
