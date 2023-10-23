import { type ButtonHTMLAttributes, type ReactElement } from 'react';

import cls from 'classnames';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  className,
  ...props
}: ButtonProps): ReactElement => (
  <button
    className={cls(
      'flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
