const QueryParamFields = {
  /**
   * The query search parameter pattern for when the user will be redirected after certain action occurs in a page, e.g.
   * after the user logs in, the user will be redirected to the page that the user was previously on.
   */
  REDIRECT_URI: 'redirect_uri',
  /**
   * The query search parameter pattern for when the analytics will be tracked for the referral code.
   */
  REFERRAL: 'referral',
} as const

export default QueryParamFields
