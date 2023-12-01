/**
 * Combine objects shallowly, i.e. only the first level of properties are merged.
 */
function combineShallow<E = unknown, T extends object = object>(...objects: E[]): T {
  return Object.assign({}, ...objects)
}

export default combineShallow
