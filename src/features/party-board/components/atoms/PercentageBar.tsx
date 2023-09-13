import { useMemo, type JSX } from "react";

import toRem from "@root/util/toRem";

// #region Utilities & Constants

const barPossibleColors = ["#E0BBE4", "#957DAD", "#D291BC", "#D291BC", "#FFDFD3"];

function $getRandomColor(): string {
  return barPossibleColors[Math.floor(Math.random() * barPossibleColors.length)];
}

// #endregion

// #region Interfaces & Types

interface PercentageBarProps {
  percentage: number;
}

// #endregion

export default function PercentageBar({ percentage }: PercentageBarProps): JSX.Element {
  const backgroundColor = useMemo(() => $getRandomColor(), []);

  return <div style={{ height: `${percentage}%`, width: toRem(36), backgroundColor }} />;
}
