import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function to properly merge the CSS {@link ClassValue | class names}
 * of the several components by combining the `clsx` and `tailwind-merge`
 * packages.
 *
 * @see {@link https://npmjs.com/package/clsx}
 * @see {@link https://npmjs.com/package/tailwind-merge}
 *
 * @deprecated Use `merge()` from `@root/util/merge` instead.
 */
function classes(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default classes
