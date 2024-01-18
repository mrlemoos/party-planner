import { type SupabaseClient, createClient as createSupabaseClient } from '@supabase/supabase-js'

import isClient from '@root/util/is-client'

class SupabaseService {
  /**
   * The URL pointing to the Supabase API URL where Planria's Supabase instance is hosted.
   */
  private readonly SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  /**
   * The (anon) public key for the Supabase API.
   */
  private readonly SUPABASE_PUBLIC_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_API_KEY

  /**
   * The instance of the {@link SupabaseClient | Supabase client} that is used to interact with the Supabase API on both
   * server side.
   */
  private supabaseClient: SupabaseClient

  constructor() {
    if (!this.SUPABASE_URL) {
      throw new Error('The SUPABASE_URL is not defined in the SupabaseService class.')
    }

    if (!this.SUPABASE_PUBLIC_KEY) {
      throw new Error('The SUPABASE_PUBLIC_KEY is not defined in the SupabaseService class.')
    }

    this.supabaseClient = createSupabaseClient(this.SUPABASE_URL, this.SUPABASE_PUBLIC_KEY)
  }

  /**
   * Returns the instance of the {@link SupabaseClient | Supabase client} that is used to interact with the Supabase
   * API on both the ONLY server side.
   *
   * @see {@link SupabaseClient}
   * @see https://supabase.io/docs/reference/javascript/supabase-client
   */
  getServerSideSupabaseClient(): SupabaseClient {
    if (isClient()) {
      throw new Error(
        'The Supabase client can only be used on the server side. See getClientSideSupabaseClient() method to have access to the Supabase client on the client side.',
      )
    }

    return this.supabaseClient
  }

  /**
   * Creates the instance of an authenticated {@link SupabaseClient | Supabase client} that is used to interact with the
   * Supabase API on the client side by using the user's access token. This is not the same as calling the
   * {@link getServerSideSupabaseClient | `getServerSideSupabaseClient()`} method on the client side. However, this
   * method may also be used on the server-side.
   *
   * @see {@link SupabaseClient}
   * @see https://supabase.io/docs/reference/javascript/supabase-client
   * @see https://clerk.com/docs/integrations/databases/supabase
   * @see {@link getServerSideSupabaseClient}
   */
  getClientSideSupabaseClient(userAccessToken: string): SupabaseClient {
    // NOTE: Create a 'sidecar' Supabase client for the client side that uses the user's access token to authenticate
    //       and interact with the Supabase API. We limit to user to restrict data access and actions.
    const sidecarClient = createSupabaseClient(this.SUPABASE_URL, this.SUPABASE_PUBLIC_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      },
    })

    return sidecarClient
  }
}

export default SupabaseService
