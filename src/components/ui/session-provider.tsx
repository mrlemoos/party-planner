'use client'

import { type ReactNode } from 'react'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

/**
 * The contract for the {@link SessionProvider} component props.
 */
interface SessionProviderProps {
  /**
   * The server or client components that will be wrapped by the session provider and have access to the user's session
   * data from the authentication provider, e.g. `Prisma`.
   */
  children: ReactNode
}

/**
 * The component that provides the session data to the application.
 *
 * @props {@link SessionProviderProps}
 */
function SessionProvider({ children }: SessionProviderProps): JSX.Element {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}

export default SessionProvider
