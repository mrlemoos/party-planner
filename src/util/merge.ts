import { type ClassValue } from 'clsx'

import classes from './classes'

/**
 * Alias for {@link classes | `classes(...input: ClassValue[])`} function that merges and combines tailwindcss classes
 * together.
 *
 * @example
 *
 * ```ts
 * const myClasses = 'bg-red-500 text-white'
 * const myOtherClasses = 'text-center bg-blue-500'
 *
 * const mergedClasses = merge(myClasses, myOtherClasses)
 * // mergedClasses = 'text-white text-center bg-blue-500'
 * ```
 *
 * @see {@link classes}
 * @see {@link https://tailwindcss.com/docs/adding-new-utilities#generating-css}
 * @see {@link https://npmjs.com/package/clsx}
 * @see {@link https://npmjs.com/package/tailwind-merge}
 */
function merge(...args: ClassValue[]): string {
  return classes(...args)
}

export default merge
