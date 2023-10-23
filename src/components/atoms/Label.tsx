import {
  type ReactNode,
  type LabelHTMLAttributes,
  type ReactElement,
} from 'react';

import cls from 'classnames';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode;
};

const Label = ({
  children,
  className,
  htmlFor,
  ...props
}: LabelProps): ReactElement => (
  <label
    className={cls(
      'mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-500',
      className,
    )}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
  </label>
);

export default Label;
