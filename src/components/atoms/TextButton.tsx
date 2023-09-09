import { forwardRef, type ButtonHTMLAttributes, type JSX } from "react";

import cls from "classnames";

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(({ className, children, ...props }, ref) => {
  return (
    <button
      className={cls(
        "h-[46px] px-4 py-2 bg-transparent text-purple-900 dark:text-purple-400 motion-safe:animate-scale-in",
        "hover:font-medium",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

TextButton.displayName = "TextButton";

export default TextButton;
