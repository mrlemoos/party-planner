import { type DependencyList, useEffect } from 'react'

/**
 * A custom hook that invokes a `callback` every given milliseconds.
 */
function useIntervalEffect(every: number, callback: () => void, dependencies: DependencyList) {
  useEffect(() => {
    const interval = setInterval(callback, every)
    return () => clearInterval(interval)
  }, [callback, every, dependencies])
}

export default useIntervalEffect
