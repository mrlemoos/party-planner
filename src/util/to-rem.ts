/**
 * The util function that returns a string of rem units from a number of pixels.
 */
function toRem(pixels: number): string {
  return `${pixels / 16}rem`
}

export default toRem
