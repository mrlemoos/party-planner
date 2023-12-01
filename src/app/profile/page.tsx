import { redirectToSignIn } from '@clerk/nextjs/server'
import { type Metadata } from 'next'

import CreateUserCollaborationMetadataDto from '@root/dto/create-user-collaboration-metadata.dto'
import UserProfile from '@root/features/user-profile/user-profile'
import createAuthRepository from '@root/repositories/auth/create-auth-repository'
import createUserCollaborationMetadataRepository from '@root/repositories/user/collaboration-metadata/create-user-collaboration-metadata-repository'
import createUserPlanRepository from '@root/repositories/user/plan/create-user-plan-repository'
import getRandomAvatarColorMatch from '@root/util/get-random-avatar-color-match'

export const metadata: Metadata = {
  title: 'Profile | Planria',
  robots: 'noindex',
}

/**
 * The authentication repository.
 */
const authRepository = createAuthRepository()
/**
 * The user plans repository.
 */
const userPlansRepository = createUserPlanRepository()
/**
 * The user collaboration metadata repository.
 */
const userCollaborationMetadataRepository = createUserCollaborationMetadataRepository()

/**
 * The URL to redirect to after the user signs in.
 */
const REDIRECT_URL = '/profile' as const

async function fetchUserCollaborationMetadataOrCoerceToCreated(userId: string) {
  try {
    const { avatarBackgroundColor, avatarForegroundColor } =
      await userCollaborationMetadataRepository.fetchUserCollaborationMetadataByUserId(userId)
    return { avatarBackgroundColor, avatarForegroundColor }
  } catch {
    const { backgroundColor, foregroundColor } = getRandomAvatarColorMatch()
    const dto = new CreateUserCollaborationMetadataDto(userId, backgroundColor, foregroundColor)
    const { avatarBackgroundColor, avatarForegroundColor } =
      await userCollaborationMetadataRepository.createUserCollaborationMetadata(dto)

    return { avatarBackgroundColor, avatarForegroundColor }
  }
}

/**
 * The profile page.
 */
async function ProfilePage(): Promise<JSX.Element> {
  const user = await authRepository.currentUser()

  if (!user) {
    return redirectToSignIn({ returnBackUrl: REDIRECT_URL })
  }
  const userId = user.uid

  const [subscription, collaborationMetadata] = await Promise.all([
    await userPlansRepository.fetchUserSubscriptionByUserId(userId),
    fetchUserCollaborationMetadataOrCoerceToCreated(userId),
  ])
  const allPlans = await userPlansRepository.fetchUserPlans()
  const currentUserPlanId = subscription.planId

  return (
    <UserProfile
      user={user}
      allPlans={allPlans}
      userCurrentPlanId={currentUserPlanId}
      avatarBackgroundColor={collaborationMetadata.avatarBackgroundColor}
      avatarForegroundColor={collaborationMetadata.avatarForegroundColor}
    />
  )
}

export default ProfilePage
