function getAverageOf(numArray: number[]): number {
  return numArray.reduce((a, b) => a + b) / numArray.length;
}

export default getAverageOf;