import QueryParamFields from '@root/constants/query-param-fields'

import getBaseURL from './get-base-url'

interface CreateSignInURIOptions<R extends string> {
  /**
   * Boolean that indicates whether the hostname should be included in the URI. If `true`, the hostname will be included
   * in the URI via the {@link process.env.NEXT_PUBLIC_VERCEL_URL base URL} from the environment variable. If `false`,
   * the hostname will not be included in the URI and the URI will begin from the `/` character.
   *
   * Given `true`, the URI will combine the base URL, e.g. `https://example.com`, with the path, e.g. `/login`. Given
   * `false`, the URI will be the relative path, e.g. `/login`.
   *
   * @default false
   */
  includeHostname?: boolean
  /**
   * The path to redirect to after the login is complete. When the redirection URI is provided, a new instance of
   * {@link URLSearchParams} will be created with the `redirect_uri` key and the value of the redirection URI. The
   * `redirect_uri` key will be appended to the URI and encoded properly.
   */
  redirectURI?: string
  /**
   * The referral code to use for the anonymous login method. If provided, the referral code will be appended to the URI
   * and encoded properly.
   *
   * @example 'login'
   */
  referral?: R
}
/**
 * Creates a login URI for the login method provided in the {@link CreateSignInURIOptions | options}.
 *
 * @see {@link CreateSignInURIOptions}
 */
function createSignInURI<R extends string>({
  includeHostname,
  redirectURI,
  referral,
}: CreateSignInURIOptions<R> = {}): string {
  const baseURL = includeHostname ? getBaseURL() : ''
  const pathname = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL

  const searchParams = new URLSearchParams()

  if (redirectURI) {
    searchParams.set(QueryParamFields.REDIRECT_URI, redirectURI)
  }

  if (referral) {
    searchParams.set(QueryParamFields.REFERRAL, referral)
  }

  if (searchParams.size === 0) {
    return `${baseURL}${pathname}`
  }

  return `${baseURL}${pathname}?${searchParams.toString()}`
}

export default createSignInURI
