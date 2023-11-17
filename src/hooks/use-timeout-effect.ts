import { useEffect } from 'react'

/**
 * A custom hook that invokes a `callback` after given milliseconds.
 */
function useTimeoutEffect(every: number, callback: () => void) {
  useEffect(() => {
    const timeout = setTimeout(callback, every)

    return () => clearTimeout(timeout)
  }, [callback, every])
}

export default useTimeoutEffect
