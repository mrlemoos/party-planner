const EMPTY_CONSTRAINTS = [undefined, null, '', 'undefined', 'null', '0', 'false', 'NaN']

/**
 * Checks whether or not the given string value is not of type `string`, or is one of the empty constraints. The empty
 * constraints are `undefined`, `null`, `''`, `'undefined'`, `'null'`, `'0'`, `'false'` and `'NaN'`.
 */
function isEmpty<T>(value: T): boolean {
  return typeof value !== 'string' || EMPTY_CONSTRAINTS.includes(String(value).trim())
}

export default isEmpty
