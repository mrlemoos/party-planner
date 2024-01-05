import CopyCurrentURLServerSideNotSupportedException from '@root/exceptions/copy-current-url-server-side-not-supported-exception'
import isClient from '@root/util/is-client'

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
 * Copy the current {@link URL} based on the current `window.location.href` and returns it. If the
 * `keepQuerySearchParams` option is set to `false`, the query search params will be removed from the returned
 * {@link URL}.
 */
function copyCurrentURL({ keepQuerySearchParams }: CopyCurrentURLOptions = defaultOptions): URL {
  if (!isClient()) {
    throw new CopyCurrentURLServerSideNotSupportedException()
  }

  const url = new URL(window.location.href)

  if (!keepQuerySearchParams) {
    url.search = ''
  }

  return url
}

export default copyCurrentURL
