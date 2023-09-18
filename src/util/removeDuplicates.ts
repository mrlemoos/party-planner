/**
 * Removes the duplicates from an array of the given {@link T} type and returns
 * the new array without the duplicates. This function does not mutate the
 * original array.
 */
export default function removeDuplicates<T>(array: T[]): T[] {
  const list = [] as T[];

  for (let index = 0; index < array.length; index += 1) {
    if (!list.includes(array[index])) {
      list.push(array[index]);
    }
  }

  return list;
}
