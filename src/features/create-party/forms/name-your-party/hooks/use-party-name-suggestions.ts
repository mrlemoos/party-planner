import { useMemo } from 'react'

import { useUser } from '@clerk/nextjs'

/**
 * The custom React hook which returns the party name suggestions according to the user data.
 */
function usePartyNameSuggestions() {
  // TODO: Replace this `useUser()` hook with a custom hook that returns the user data according to our model.
  const { user } = useUser()

  const userFullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ')
  const userHandle = user?.username

  const suggestionWithFullName = userFullName ? `${userFullName}'s party` : 'My custom party'
  const suggestionWithUserHandle = userHandle ? `${userHandle}'s party` : 'Voting party'

  const suggestions = useMemo(
    () => [suggestionWithFullName, suggestionWithUserHandle].filter(Boolean),
    [suggestionWithFullName, suggestionWithUserHandle],
  )

  return suggestions
}

export default usePartyNameSuggestions
