import { redirectToSignIn } from '@clerk/nextjs/server'

import GradientBackground from '@root/components/ui/gradient-background'
import CreateParty from '@root/features/create-party/create-party'
import createAuthRepository from '@root/repositories/auth/create-auth-repository'
import createPartiesRepository from '@root/repositories/parties/create-parties-repository'
import CreatePartyDataTransferObject from '@root/repositories/parties/dto/create-party-data-transfer-object'

const auth = createAuthRepository()
const parties = createPartiesRepository()

async function PartiesCreatePage(): Promise<JSX.Element> {
  const user = await auth.currentUser()

  if (!user) {
    // NOTE: The if statement above should never happen to be true, but you know, better safe than sorry :)
    return redirectToSignIn({ returnBackUrl: '/parties/create' })
  }

  const partyOwnerId = user?.uid
  const partyOwnerDisplayName = user?.displayName

  const dto = new CreatePartyDataTransferObject(partyOwnerId, partyOwnerDisplayName)
  const { partyId } = await parties.createParty(dto)

  return (
    <GradientBackground>
      <main className='container mt-[12vh] min-h-[88vh]'>
        <CreateParty partyId={partyId} />
      </main>
    </GradientBackground>
  )
}

export default PartiesCreatePage
