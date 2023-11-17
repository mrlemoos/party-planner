/**
 * Get the element type of an array type, whatever the sort of array is.
 */
type ArrayElement<T> = T extends readonly (infer E)[] | Array<infer E> | ReadonlyArray<infer E> | (infer E)[]
  ? E
  : never

export default ArrayElement
