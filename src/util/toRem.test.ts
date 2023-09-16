import { describe, test, expect } from "bun:test";

import toRem from "./toRem";

const makeSut = ({ pixels }: { pixels: number }) => {
  const runSandbox = () => toRem(pixels);

  return { runSandbox };
};

describe("given the numbers of pixel as the parameter", () => {
  test("returns the conversion to rem unit", () => {
    const { runSandbox } = makeSut({ pixels: 32 });

    const rem = runSandbox();

    expect(rem).toBe("2rem");
  });
});
