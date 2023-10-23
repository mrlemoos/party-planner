import { type InputHTMLAttributes, type ReactElement } from 'react';

import cls from 'classnames';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  className,
  name,
  type = 'text',
  ...props
}: InputProps): ReactElement => (
  <input
    className={cls(
      'mb-3 block w-full appearance-none rounded border bg-gray-200 px-4 py-3 leading-tight text-gray-700 transition focus:bg-white focus:outline-none dark:border-gray-600 dark:bg-gray-600 dark:text-gray-300 dark:focus:bg-gray-600',
      className,
    )}
    name={name}
    type={type}
    {...props}
  />
);

export default Input;
