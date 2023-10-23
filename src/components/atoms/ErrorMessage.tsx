import { HTMLAttributes, type ReactElement } from 'react';

import cls from 'classnames';

type ErrorMessageProps = HTMLAttributes<HTMLParagraphElement>;

const ErrorMessage = ({
  id,
  className,
  children,
  'aria-hidden': ariaHidden,
  ...props
}: ErrorMessageProps): ReactElement => (
  <p
    id={id}
    className={cls('h-4 text-xs text-red-500', className)}
    aria-hidden={ariaHidden}
    {...props}
  >
    {children}
  </p>
);

export default ErrorMessage;
