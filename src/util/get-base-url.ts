import getServiceProtocol from './get-service-protocol'

/**
 * Gets the base URL from the environment variables with the protocol and hostname, *e.g.* `https://example.com`.
 *
 * @example
 * ```ts
 *
 * const baseURL = getBaseURL()
 * // => 'https://example.com'
 *
 * ```
 */
function getBaseURL(): string {
  // The hostname is the Vercel URL. It is automatically set by the Vercel pipeline when the application is deployed and
  // further accessible via the `NEXT_PUBLIC_VERCEL_URL` environment variable.
  const hostname = process.env.NEXT_PUBLIC_VERCEL_URL
  const protocol = getServiceProtocol()

  const baseURL = `${protocol}://${hostname}`

  return baseURL
}

export default getBaseURL
