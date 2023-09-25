import { describe, expect, test } from 'bun:test';

import getAverageOf from './getAverageOf';

const makeSut = (...list: number[]) => {
  const runSandbox = () => getAverageOf(list);

  return { runSandbox };
};

describe('given an array of numbers', () => {
  test('returns the average of all the numbers', () => {
    const { runSandbox } = makeSut(0, 10);

    const average = runSandbox();

    expect(average).toBe(5);
  });
});
