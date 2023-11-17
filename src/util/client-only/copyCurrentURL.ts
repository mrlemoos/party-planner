import isClient from '../is-client'

/**
 * The options for the {@link copyCurrentURL} function. The `keepQuerySearchParams` option is set to `false` by default.
 */
interface CopyCurrentURLOptions {
  keepQuerySearchParams?: boolean
}

/**
 * The default options for the {@link copyCurrentURL} function.
 */
const defaultOptions: CopyCurrentURLOptions = {
  keepQuerySearchParams: false,
}

/**
 * The error thrown when the {@link copyCurrentURL} function is called on the server side.
 */
class CopyCurrentURLServerSideNotSupportException extends Error {
  constructor() {
    super('The copyCurrentURL() function is not supported on the server side.')
  }
}

/**
 * Copy the current {@link URL} based on the current `window.location.href` and returns it. If the
 * `keepQuerySearchParams` option is set to `false`, the query search params will be removed from the returned
 * {@link URL}.
 */
function copyCurrentURL({ keepQuerySearchParams }: CopyCurrentURLOptions = defaultOptions): URL {
  if (!isClient()) {
    throw new CopyCurrentURLServerSideNotSupportException()
  }

  const url = new URL(window.location.href)

  if (!keepQuerySearchParams) {
    url.search = ''
  }

  return url
}

export default copyCurrentURL
