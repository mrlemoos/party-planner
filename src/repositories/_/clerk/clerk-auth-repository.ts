import { currentUser as getClerkCurrentUser, User as ClerkUser } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs'

import AuthRepository from '@root/repositories/auth/auth-repository'
import type CurrentUserResult from '@root/repositories/auth/current-user-result'

class ClerkAuthRepository extends AuthRepository {
  private getUserPhotoURLFromClerkServiceOrExternalAccountProvider(clerkUser: ClerkUser | null): string | undefined {
    if (!clerkUser) {
      return
    }
    if (clerkUser.hasImage) {
      return clerkUser.imageUrl
    }

    for (const externalAccount of clerkUser.externalAccounts) {
      if (externalAccount.imageUrl) {
        return externalAccount.imageUrl
      }
    }
  }

  async currentUser(): Promise<CurrentUserResult | undefined> {
    const clerkUser = await getClerkCurrentUser()

    if (!clerkUser) {
      return undefined
    }

    const displayName = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ')
    const emailAddressObject = clerkUser.primaryEmailAddressId
      ? clerkUser.emailAddresses.find(({ id }) => id === clerkUser.primaryEmailAddressId)
      : undefined
    const email = emailAddressObject?.emailAddress
    const isEmailVerified =
      // Reference: https://clerk.com/docs/references/javascript/verification#verification
      emailAddressObject?.verification?.status === 'verified'

    const uid = clerkUser.id
    const token = await auth().getToken()

    if (!(token && uid)) {
      return undefined
    }

    const phoneNumber = clerkUser.phoneNumbers?.[0]?.phoneNumber
    const photoURL = this.getUserPhotoURLFromClerkServiceOrExternalAccountProvider(clerkUser)
    const isTwoFactorAuthenticationEnabled = clerkUser.twoFactorEnabled
    const username = clerkUser.username ?? undefined
    const lastSignInAt = clerkUser.lastSignInAt ?? undefined

    const user: CurrentUserResult = {
      displayName,
      email,
      isEmailVerified,
      token,
      uid,
      phoneNumber,
      photoURL,
      isTwoFactorAuthenticationEnabled,
      lastSignInAt,
      username,
    }

    return user ?? undefined
  }
}

export default ClerkAuthRepository
