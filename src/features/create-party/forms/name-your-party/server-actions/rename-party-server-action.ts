'use server'

import { redirectToSignIn } from '@clerk/nextjs/server'
import { RedirectType, redirect } from 'next/navigation'

import createAuthRepository from '@root/repositories/auth/create-auth-repository'
import createPartiesRepository from '@root/repositories/parties/create-parties-repository'

import CreatePartyFormFieldNames from '../../../constants/create-party-form-field-names'
import CreatePartySteps from '../../../constants/create-party-step'
import transformFormDataIntoObject from '@root/util/transform-form-data-into-object'

/**
 * This server action dispatches an TCP request via the repository to rename the party. If the user is NOT
 * authenticated, the user will be redirected to the sign-in page. If the user is authenticated, the party will be
 * renamed and the user will be redirected to the next step of the party creation process.
 *
 * @param partyId - The ID of the party which will be renamed.
 * @param formData - The {@link FormData} instance which contains the new party name.
 * @returns The promise of the server action.
 */
export default async function renamePartyServerAction(partyId: string, formData: FormData): Promise<void> {
  const authRepository = createAuthRepository()

  const userToken = await authRepository.getCurrentUserTokenByTemplate('supabase')

  if (!userToken) {
    redirectToSignIn({ returnBackUrl: `/parties/create/${partyId}` })
    return
  }

  const newPartyName = formData.get(CreatePartyFormFieldNames.PARTY_NAME)

  const searchParams = new URLSearchParams()

  if (typeof newPartyName !== 'string' || newPartyName.length === 0) {
    searchParams.set('error', 'REQUIRED')
    return redirect(`/parties/create/${partyId}?${searchParams.toString()}`, RedirectType.replace)
  }

  const partiesRepository = createPartiesRepository(userToken)

  try {
    await partiesRepository.renameParty(partyId, newPartyName)
  } catch (error) {
    const formValues = transformFormDataIntoObject(formData)
    console.log(
      `ERROR: An error ocurred while the process was trying to rename the party. See the call of renamePartyServerAction("${partyId}", ${JSON.stringify(
        formValues,
      )})`,
    )

    searchParams.set('error', 'INTERNAL')
    return redirect(`/parties/create/${partyId}?${searchParams.toString()}`, RedirectType.replace)
  }

  searchParams.set('step', CreatePartySteps.TEAM_INVITATION)
  return redirect(`/parties/create/${partyId}`, RedirectType.replace)
}
