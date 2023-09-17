import { useAuth } from "@clerk/nextjs";

import getSessionToken from "@root/util/getSessionToken";

export default function useCurrentUser() {
  const { userId, isSignedIn, sessionId, signOut } = useAuth();

  return {
    userId,
    isSignedIn,
    sessionId,
    signOut,
  };
}
