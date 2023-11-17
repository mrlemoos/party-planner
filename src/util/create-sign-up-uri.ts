import QueryParamFields from '@root/constants/query-param-fields'

import getBaseURL from './get-base-url'

/**
 * The pathname for the sign-up page.
 */
const SIGN_UP_PATHNAME = '/auth/sign-up' as const

interface CreateSignUpURIOptions<R extends string> {
  /**
   * Boolean that indicates whether the hostname should be included in the URI. If `true`, the hostname will be included
   * in the URI via the {@link process.env.NEXT_PUBLIC_VERCEL_URL base URL} from the environment variable. If `false`,
   * the hostname will not be included in the URI and the URI will begin from the `/` character.
   *
   * Given `true`, the URI will combine the base URL, e.g. `https://example.com`, with the path, e.g. `/sign-up`.
   * Given `false`, the URI will be the relative path, e.g. `/sign-up`.
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
   * The referral code. If provided, the referral code will be appended to the URI and encoded properly.
   *
   * @example 'login'
   */
  referral?: R
}
/**
 * Creates a sign-up URI.
 *
 * @see {@link CreateSignUpURIOptions}
 */
function createSignUpURI<R extends string>({
  includeHostname,
  redirectURI,
  referral,
}: CreateSignUpURIOptions<R> = {}): string {
  const baseURL = includeHostname ? getBaseURL() : ''

  const searchParams = new URLSearchParams()

  if (redirectURI) {
    searchParams.set(QueryParamFields.REDIRECT_URI, redirectURI)
  }

  if (referral) {
    searchParams.set(QueryParamFields.REFERRAL, referral)
  }

  if (searchParams.size === 0) {
    return `${baseURL}${SIGN_UP_PATHNAME}`
  }

  return `${baseURL}${SIGN_UP_PATHNAME}?${searchParams.toString()}`
}

export default createSignUpURI
