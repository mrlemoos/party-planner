/**
 * Deep merge two or more objects together and returns the {@link U} type as result.
 *
 * If only one argument is passed, then it will be returned as is. If no arguments are passed, then an empty object will
 * be returned.
 */
function deepmerge<U>(...args: unknown[]): U {
  if (args.length === 0) {
    return {} as U
  }

  if (args.length === 1) {
    return args[0] as U
  }

  const target = {} as Record<string, unknown>

  for (const arg of args) {
    if (typeof arg !== 'object' || arg === null) {
      continue
    }

    for (const key in arg) {
      const value = arg[key as keyof typeof arg]

      target[key] = typeof value === 'object' && value !== null ? deepmerge(target[key], value) : value
    }
  }

  return target as U
}

export default deepmerge
