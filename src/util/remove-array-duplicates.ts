/**
 * Removes the duplicates from an array of the given {@link T} type and returns the new array without the duplicates.
 * This function does not mutate the original array.
 */
export default function removeDuplicates<T>(array: T[]): T[] {
  const list = [] as T[]

  for (const element of array) {
    if (!list.includes(element)) {
      list.push(element)
    }
  }

  return list
}
