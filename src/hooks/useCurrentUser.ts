import { useAuth } from "@clerk/nextjs";

export default function useCurrentUser() {
  const { userId, isSignedIn, sessionId, signOut } = useAuth();

  return {
    userId,
    isSignedIn,
    sessionId,
    signOut,
  };
}
