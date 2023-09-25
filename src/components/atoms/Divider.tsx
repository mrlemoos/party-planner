import { type HTMLAttributes, memo } from 'react';

import cls from 'classnames';

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** @ignore */
  children?: never;
}

const Divider = memo<DividerProps>(({ className, ...props }) => (
  <div className={cls('border-t border-gray-500', className)} {...props} />
));

Divider.displayName = 'Divider';

export default Divider;
