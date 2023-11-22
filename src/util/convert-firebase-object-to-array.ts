/**
 * Converts a Firebase object that corresponds to an array to an actual JavaScript array. The Firebase list data
 * structure is an object where each numbered key is the index of the array and the value is the value at that index.
 * This function converts that object to an actual array.
 */
export default function convertFirebaseObjectToArray<T extends object, E extends T[keyof T]>(arrayLike: T): E[] {
  return Object.values(arrayLike).map(([, value]) => value)
}
