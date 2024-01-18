import { redirectToSignIn } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import createAuthRepository from '@root/repositories/auth/create-auth-repository'
import createPartiesRepository from '@root/repositories/parties/create-parties-repository'

/**
 * The instance of the auth repository.
 */
const authRepository = createAuthRepository()

/**
 * The URL to redirect after the user signs up or signs in successfully if the user is not signed in already.
 */
const REDIRECT_URL = '/parties/create' as const

/**
 * This function creates a party and then returns its ID.
 */
async function createPartyAndReturnId(userAccessToken: string): Promise<string> {
  const partiesRepo = createPartiesRepository(userAccessToken)

  const party = await partiesRepo.createParty()

  return party.id
}

/**
 * The name of the user token template to allow authentication to the repository layer.
 */
const USER_TOKEN_TEMPLATE_NAME = 'supabase' as const

async function PartiesCreatePage(): Promise<JSX.Element> {
  const token = await authRepository.getCurrentUserTokenByTemplate(USER_TOKEN_TEMPLATE_NAME)

  console.log({ token })

  if (!token) {
    // NOTE: The if statement above should never happen to be true, but you know, better safe than sorry :)
    return redirectToSignIn({ returnBackUrl: REDIRECT_URL })
  }

  const userAccessToken = token

  const partyId = await createPartyAndReturnId(userAccessToken)

  const href = `/parties/create/${partyId}`

  return redirect(href)
}

export default PartiesCreatePage
