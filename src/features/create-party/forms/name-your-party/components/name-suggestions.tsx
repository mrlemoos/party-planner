'use client'

import { useCallback, type JSX } from 'react'

import Badge from '@root/components/ui/badge'

import usePartyNameSuggestions from '../hooks/use-party-name-suggestions'
import SelectNameSuggestionEvent from '../events/select-name-suggestion-event'

interface NameSuggestionsProps {
  /**
   * This event handler which is called when a suggestion is selected.
   */
  onSelectSuggestion: (event: SelectNameSuggestionEvent) => void
  /**
   * The boolean which indicates whether or not the party name is the default party name.
   */
  isDefaultPartyNameSuggested: boolean
  /**
   * The default party name.
   */
  defaultPartyName: string
}

/**
 * The component which renders the name suggestions for the party name controlled input.
 *
 * @props {@link NameSuggestionsProps}
 */
function NameSuggestions({
  onSelectSuggestion,
  isDefaultPartyNameSuggested,
  defaultPartyName,
}: NameSuggestionsProps): JSX.Element {
  const suggestions = usePartyNameSuggestions()

  const handleSelectSuggestion = useCallback(
    (newValue: string) => (): void => onSelectSuggestion(new SelectNameSuggestionEvent(newValue)),
    [onSelectSuggestion],
  )

  return (
    <div className='mt-4 flex items-center gap-3'>
      <span className='text-foreground/50'>Suggestions:</span>
      {!isDefaultPartyNameSuggested && (
        <Badge onClick={handleSelectSuggestion(defaultPartyName)} className='cursor-pointer'>
          {defaultPartyName}
        </Badge>
      )}
      {suggestions.map((suggestion) => (
        <Badge
          onClick={handleSelectSuggestion(suggestion)}
          key={suggestion}
          variant='secondary'
          className='cursor-pointer'
        >
          {suggestion}
        </Badge>
      ))}
    </div>
  )
}

export default NameSuggestions
