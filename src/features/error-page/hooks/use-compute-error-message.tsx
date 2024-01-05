'use client'

import { useMemo } from 'react'

interface UseComputeErrorMessageProps {
  /**
   * The error that caused the segment to fail. See https://nextjs.org/docs/app/api-reference/file-conventions/error for
   * more information.
   *
   * @see https://nextjs.org/docs/app/api-reference/file-conventions/error
   */
  error?: Error & { digest?: string }
}

/**
 * The {@link process.env} constant that determines whether the application is in development mode.
 */
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

/**
 * This React Hook computes the error message from the given {@link UseComputeErrorMessageProps.error | error}.
 *
 * @see {@link UseComputeErrorMessageProps}
 */
function useComputeErrorMessage({ error }: UseComputeErrorMessageProps) {
  const computedErrorMessage = useMemo(() => {
    if (error instanceof Error) {
      // NOTE: The original message is only shown in development mode to avoid leaking sensitive information to the
      // end-user in production.
      if (error.message && IS_DEVELOPMENT) {
        return error.message
      }
    }

    return 'An unexpected error occurred. Please try again.'
  }, [error])

  return computedErrorMessage
}

export default useComputeErrorMessage
