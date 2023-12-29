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
 * This React Hook computes the error message from the given {@link UseComputeErrorMessageProps.error | error}.
 *
 * @see {@link UseComputeErrorMessageProps}
 */
function useComputeErrorMessage({ error }: UseComputeErrorMessageProps) {
  const computedErrorMessage = useMemo(
    function () {
      if (error instanceof Error) {
        if (error.digest) {
          return error.digest
        }

        if (error.message) {
          return error.message
        }
      }

      return 'An unknown error occurred. Please try again.'
    },
    [error],
  )

  return computedErrorMessage
}

export default useComputeErrorMessage
