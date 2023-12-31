import { User as ClerkUser, auth, currentUser } from '@clerk/nextjs/server'

import AuthRepository from '@root/repositories/auth/auth-repository'
import UserModel from '@root/models/user-model'

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

  async currentUser(): Promise<UserModel | undefined> {
    const clerkUser = await currentUser()

    if (!clerkUser) {
      return
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
      return
    }

    const phoneNumber = clerkUser.phoneNumbers?.[0]?.phoneNumber
    const photoURL = this.getUserPhotoURLFromClerkServiceOrExternalAccountProvider(clerkUser)
    const isTwoFactorAuthenticationEnabled = clerkUser.twoFactorEnabled
    const username = clerkUser.username ?? undefined
    const lastSignInAt = clerkUser.lastSignInAt ?? undefined

    const user: UserModel = {
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

    return user
  }
}

export default ClerkAuthRepository
