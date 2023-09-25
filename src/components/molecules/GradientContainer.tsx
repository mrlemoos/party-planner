import { type ReactNode } from 'react';

import cls from 'classnames';

interface GradientContainerProps {
  children: ReactNode;
}

export default function GradientContainer({
  children,
}: GradientContainerProps): JSX.Element {
  return (
    <div
      className={cls(
        'flex flex-col justify-center items-center bg-gradient-to-tr from-blue-400 to-purple-400',
        'dark:from-blue-800 dark:to-purple-800',
      )}
      style={{ width: '100vw', height: '100vh' }}
    >
      {children}
    </div>
  );
}
