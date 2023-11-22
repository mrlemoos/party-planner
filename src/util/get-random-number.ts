/**
 * Gets the random number from the given range. The range is `100` to the given number.
 */
export default function getRandomNumber(rangeOf: number = 100): number {
  const randomNumber = Math.floor(Math.random() * rangeOf)

  return randomNumber
}
