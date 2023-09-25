import { forwardRef, type ButtonHTMLAttributes, type JSX } from 'react';

import cls from 'classnames';

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cls(
          'h-[46px] px-4 py-2 bg-transparent text-purple-900 dark:text-purple-400 motion-safe:animate-scale-in',
          'hover:bg-purple-100 dark:hover:bg-purple-900 hover:bg-opacity-10 dark:hover:bg-opacity-10 rounded-md',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

TextButton.displayName = 'TextButton';

export default TextButton;
