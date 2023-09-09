import { HTMLAttributes, type ReactElement } from "react";

import cls from "classnames";

type ErrorMessageProps = HTMLAttributes<HTMLParagraphElement>;

const ErrorMessage = ({
  id,
  className,
  children,
  "aria-hidden": ariaHidden,
  ...props
}: ErrorMessageProps): ReactElement => (
  <p id={id} className={cls("text-red-500 text-xs h-4", className)} aria-hidden={ariaHidden} {...props}>
    {children}
  </p>
);

export default ErrorMessage;
