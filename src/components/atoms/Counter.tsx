'use client';

import { memo, type JSX, useId } from 'react';

import cls from 'classnames';

type CounterSeparator = '/' | 'of' | 'out of' | (string & {});

interface CounterProps {
  /**
   * The number that represents the current value. It is aligned to the left
   * side of the {@link separator}.
   *
   * @see {@link separator}
   * @see {@link total}
   */
  current: number;

  /**
   * The number that represents the total value. It is aligned to the right
   * side of the {@link separator}.
   *
   * @see {@link separator}
   * @see {@link current}
   */
  total: number;
  /**
   * The string that separates the current and total values.
   *
   * @default '/'
   *
   * @see {@link current}
   * @see {@link total}
   */
  separator?: CounterSeparator;
}

function Counter$({ current, total }: CounterProps): JSX.Element {
  const counterRootId = useId();

  const isOverlapping = current > total;

  return (
    <span
      className="flex items-center text-sm text-gray-500"
      id={counterRootId}
    >
      <span
        className={cls({ 'text-red-500': isOverlapping })}
        aria-describedby={counterRootId}
      >
        {current}
      </span>
      &nbsp;/&nbsp;{total}
    </span>
  );
}

const Counter = memo(Counter$);

export default Counter;
