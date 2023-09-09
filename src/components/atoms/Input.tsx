import { type InputHTMLAttributes, type ReactElement } from "react";

import cls from "classnames";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, name, type = "text", ...props }: InputProps): ReactElement => (
  <input
    className={cls(
      "appearance-none block w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600 transition dark:border-gray-600",
      className
    )}
    name={name}
    type={type}
    {...props}
  />
);

export default Input;
