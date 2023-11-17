import Link from 'next/link'

import createAuthRepository from '@root/repositories/auth/create-auth-repository'
import FeatureFlagService from '@root/services/feature-flag-service'
import createSignInURI from '@root/util/create-sign-in-uri'

import Button from './button'

const REFERRAL = 'top-bar-profile-button' as const

const repo = createAuthRepository()
const features = new FeatureFlagService()

const loginHref = createSignInURI({ referral: REFERRAL })

/**
 * The `<TopBarProfileButton />` component is a button that is used in the `<TopBar />` component to designate the
 * profile button.
 */
async function TopBarProfileButton(): Promise<JSX.Element | null> {
  const user = await repo.currentUser()

  // TODO: remove this when we're ready to open the site to everyone.
  const isClosedToBeta = await features.getFeatureFlag('closed-for-beta')

  if (isClosedToBeta) {
    return null
  }

  if (!user) {
    return (
      <Button asChild={true} variant='primary' className='font-semibold'>
        <Link href={loginHref} target='_self'>
          Log In
        </Link>
      </Button>
    )
  }

  return null
}

export default TopBarProfileButton
