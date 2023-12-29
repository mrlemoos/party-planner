import { useMemo } from 'react'

import { useSearchParams } from 'next/navigation'

/**
 * The key of the query parameter that contains the error message.
 */
const ERROR_QUERY_PARAM_KEY = 'error' as const

/**
 * The hook that returns a detailed message of the error. If no error is found according to the query parameter, a
 * default message is returned, *i.e.*, `'We could not find this page. Please, try again later.'`.
 */
function useNotFoundDetailedError() {
  const searchParams = useSearchParams()

  const error = searchParams.get(ERROR_QUERY_PARAM_KEY)

  const coercedError = useMemo(
    function () {
      return error ?? 'We could not find this page. Please, try again later.'
    },
    [error],
  )

  return coercedError
}

export default useNotFoundDetailedError
