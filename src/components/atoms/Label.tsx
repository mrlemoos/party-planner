import { type ReactNode, type LabelHTMLAttributes, type ReactElement } from "react";

import cls from "classnames";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode;
};

const Label = ({ children, className, htmlFor, ...props }: LabelProps): ReactElement => (
  <label
    className={cls(
      "block uppercase tracking-wide text-gray-700 dark:text-gray-500 text-xs font-bold mb-2",
      className
    )}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
  </label>
);

export default Label;
