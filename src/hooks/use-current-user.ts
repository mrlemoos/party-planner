import { useUser as useClerkUser } from '@clerk/nextjs'

function useCurrentUser() {
  const { user } = useClerkUser()
  return user
}

export default useCurrentUser
