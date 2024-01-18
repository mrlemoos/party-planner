import { useCallback, useState, type ChangeEvent as ReactChangeEvent } from 'react'

/**
 * The props which map to the {@link useNamePartyFormController} hook.
 */
interface UseNamePartyFormControllerProps {
  defaultValue: string
}

/**
 * The custom hook which controls the form on the client-side for the party naming process.
 *
 * @props {@link UseNamePartyFormControllerProps}
 */
function useNamePartyFormController({ defaultValue }: UseNamePartyFormControllerProps) {
  const [partyNameControlledInputValue, setPartyNameControlledInputValue] = useState(defaultValue)

  const handleSetPartyNameControlledValue = useCallback((value: string) => setPartyNameControlledInputValue(value), [])

  const handlePartyNameControlledInputChange = useCallback(
    (event: ReactChangeEvent<HTMLInputElement>) => setPartyNameControlledInputValue(event.target.value),
    [],
  )

  return { partyNameControlledInputValue, handlePartyNameControlledInputChange, handleSetPartyNameControlledValue }
}

export default useNamePartyFormController
