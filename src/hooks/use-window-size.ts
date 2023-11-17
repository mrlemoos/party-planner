'use client'

import { useEffect, useState } from 'react'

import isClient from '@root/util/is-client'

interface WindowSize {
  /**
   * The height in pixels of the browser window viewport including, if rendered, the horizontal scrollbar.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
   *
   * @default 0
   */
  height: number
  /**
   * The width in pixels of the browser window viewport including, if rendered, the vertical scrollbar.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth
   *
   * @default 0
   */
  width: number
}

/**
 * The hook that returns the current window size.
 *
 * @example
 * ```tsx
 * import useWindowSize from '@root/hooks/use-window-size'
 *
 * function MyComponent() {
 *  const { height, width } = useWindowSize()
 *
 * return (
 *   <div>
 *     <p>Window height: {height}</p>
 *     <p>Window width: {width}</p>
 *   </div>
 * )
 * ```
 */
function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({ height: 0, width: 0 })

  useEffect(() => {
    if (!isClient()) {
      return
    }

    function handleResize() {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export default useWindowSize
