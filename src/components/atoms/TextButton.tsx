import { forwardRef, type ButtonHTMLAttributes } from 'react';

import cls from 'classnames';

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cls(
          'h-[46px] bg-transparent px-4 py-2 text-purple-900 motion-safe:animate-scale-in dark:text-purple-400',
          'rounded-md hover:bg-purple-100 hover:bg-opacity-10 dark:hover:bg-purple-900 dark:hover:bg-opacity-10',
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
