/**
 * The DeepPartial type transform all properties of nested objects into optional properties recursively.
 *
 * @example
 * ```ts
 *
 * interface Foo {
 *  bar: {
 *   baz: string
 *  }
 * }
 *
 * type PartialFoo = DeepPartial<Foo>
 * // {
 * //   bar?: {
 * //     baz?: string
 * //   }
 * // }
 * ```
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : Partial<T[P]>
}

export default DeepPartial
