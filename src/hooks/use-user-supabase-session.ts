import { useEffect, useState } from 'react'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import type { SupabaseClient } from '@supabase/supabase-js'

import SupabaseService from '@root/services/supabase-service'

/**
 * The template name for the Supabase token. See https://clerk.com/docs/integrations/databases/supabase for more detail.
 */
const SUPABASE_TOKEN_TEMPLATE = 'supabase' as const

/**
 * This is a custom React hook which is used to retrieve the {@link SupabaseClient | Supabase client} and the user's
 * access token from the Clerk.js session. The usage of this hook **is implementation-dependent**. Therefore, it is
 * recommended to always create a custom hook that utilizes this one hence the the view layer is coupled to neither the
 * Clerk.js session nor the Supabase client.
 *
 * Also, please notice that this process is asynchronous.
 *
 * @see https://clerk.com/docs/integrations/databases/supabase
 *
 * @example
 * ```tsx
 * import { useEffect } from 'react'
 *
 * import { useUserSupabaseSession } from '@root/hooks/use-user-supabase-session'
 *
 * function useMyCustomHook() {
 *   const supabaseClient = useUserSupabaseSession()
 *
 *   useEffect(() => {
 *     if (!supabaseClient) {
 *       return
 *     }
 *
 *     const channel = supabaseClient.channel('realtime_whatever')
 *
 *     //                                      '*' means all events
 *     channel.on('postgres_changes', { event: '*', schema: 'public', table: 'whatnot' }, (payload) => {}).subscribe()
 *   }, [supabaseClient])
 * }
 * ```
 */
function useUserSupabaseSession(): SupabaseClient | undefined {
  const { getToken } = useAuth()
  const router = useRouter()

  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | undefined>()

  useEffect(() => {
    async function loadUserAccessToken() {
      const userAccessToken = await getToken({ template: SUPABASE_TOKEN_TEMPLATE })

      if (!userAccessToken) {
        if (process.env.NODE_ENV != 'production') {
          console.warn(
            'It was not possible to retrieve the JWT string from the getToken(). See the useUserSupabaseSession() hook for more detail.',
          )
        }
        router.replace('/auth/sign-in')
        return
      }

      const supabaseService = new SupabaseService()

      const newlyInstantiatedSupabaseClient = supabaseService.getClientSideSupabaseClient(userAccessToken)

      setSupabaseClient(newlyInstantiatedSupabaseClient)
    }

    loadUserAccessToken()
  }, [getToken, router])

  return supabaseClient
}

export default useUserSupabaseSession
