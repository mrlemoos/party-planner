import { useMemo, type JSX } from 'react';

import cls from 'classnames';

import Tooltip from '@root/components/atoms/Tooltip';
import Poppins from '@root/styles/Poppins';
import toRem from '@root/util/toRem';

// #region Utilities & Constants

const barPossibleColors = [
  '#E0BBE4',
  '#957DAD',
  '#D291BC',
  '#D291BC',
  '#FFDFD3',
];

function $getRandomColor(): string {
  return barPossibleColors[
    Math.floor(Math.random() * barPossibleColors.length)
  ];
}

// #endregion

// #region Interfaces & Types

interface PercentageBarProps {
  percentage: number;
}

// #endregion

export default function PercentageBar({
  percentage,
}: PercentageBarProps): JSX.Element {
  const backgroundColor = useMemo(() => $getRandomColor(), []);

  const displayPercentageValue =
    // Given the percentage is NaN, it means that the value is not available yet,
    // so we hand over the null value to the Tooltip component so the ReactNode
    // won't render.
    Number.isNaN(percentage) ? null : (
      <span
        className={cls(Poppins.className, 'text-sm font-medium')}
      >{`${percentage.toFixed(1).replace('.0', '')}%`}</span>
    );

  return (
    <Tooltip content={displayPercentageValue}>
      <div
        style={{ height: `${percentage}%`, width: toRem(36), backgroundColor }}
        aria-label={`${percentage} percent of the votes`}
      />
    </Tooltip>
  );
}
