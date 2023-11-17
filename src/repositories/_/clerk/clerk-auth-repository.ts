import { currentUser as getClerkCurrentUser } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs'

import AuthLoginDataTransferObject from '@root/dto/auth-login.dto'
import CreateAccountDataTransferObject from '@root/dto/create-account.dto'
import ServiceMethodNotImplementedException from '@root/exceptions/service-method-not-implemented-exception'
import AuthRepository from '@root/repositories/auth/auth-repository'
import type CurrentUserResult from '@root/repositories/auth/current-user-result'
import type AuthLoginResult from '@root/repositories/auth/auth-login-result'

class ClerkAuthRepository extends AuthRepository {
  async currentUser(): Promise<CurrentUserResult | undefined> {
    const user = await getClerkCurrentUser()

    const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(' ')
    const emailAddressObject = user?.primaryEmailAddressId
      ? user.emailAddresses.find(({ id }) => id === user.primaryEmailAddressId)
      : undefined
    const email = emailAddressObject?.emailAddress
    const isEmailVerified =
      // Reference: https://clerk.com/docs/references/javascript/verification#verification
      emailAddressObject?.verification?.status === 'verified'

    const uid = user?.id
    const token = await auth().getToken()

    if (!(token && uid)) {
      return undefined
    }

    const phoneNumber = user?.phoneNumbers?.[0]?.phoneNumber
    const photoURL = user?.hasImage ? user?.imageUrl : undefined

    const result: CurrentUserResult = {
      displayName,
      email,
      isEmailVerified,
      token,
      uid,
      phoneNumber,
      photoURL,
    }

    return result ?? undefined
  }
  signUp(_dto: CreateAccountDataTransferObject): Promise<AuthLoginResult> {
    throw new ServiceMethodNotImplementedException('signUp')
  }
  login(_dto: AuthLoginDataTransferObject): Promise<AuthLoginResult> {
    throw new ServiceMethodNotImplementedException('login')
  }
}

export default ClerkAuthRepository
