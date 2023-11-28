import { useCallback, useState } from 'react'

/**
 * The useToggleState hook is a simple hook that returns a boolean value and a function to toggle it.
 */
function useToggleState(): [boolean, () => void] {
  const [isToggled, toggle] = useState(false)

  const handleToggle = useCallback(() => {
    toggle((previous) => !previous)
  }, [])

  return [isToggled, handleToggle]
}

export default useToggleState
