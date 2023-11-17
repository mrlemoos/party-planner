const ContactUsSearchParams = {
  /**
   * The query URL search param that is filled out when the user has successfully sent their message.
   */
  SUCCESS_QUERY_URL_SEARCH_PARAM_KEY: 'thank-you',
  /**
   * The value `'true'` that is appended to the
   * {@link ContactUsSearchParams.SUCCESS_QUERY_URL_SEARCH_PARAM_KEY query param} when the user has successfully sent
   * their message.
   */
  SUCCESS_QUERY_URL_SEARCH_PARAM_VALUE: 'true',
} as const

export default ContactUsSearchParams
