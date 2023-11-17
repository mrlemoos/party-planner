'use client'

import { Fragment, useMemo } from 'react'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

import TopBar from '@root/components/ui/top-bar'
import createSignUpURI from '@root/util/create-sign-up-uri'

const REFERRAL = 'PROTECTED_TOP_BAR_USER_PROFILE_BUTTON' as const

const AFTER_SIGN_OUT_URL = '/'

function UserProfileButton(): JSX.Element {
  const pathname = usePathname()
  const hrefSignUp = useMemo(() => createSignUpURI({ referral: REFERRAL, redirectURI: pathname }), [pathname])

  return (
    <Fragment>
      <SignedIn>
        <UserButton afterSignOutUrl={AFTER_SIGN_OUT_URL} />
      </SignedIn>
      <SignedOut>
        <TopBar.Button href={hrefSignUp}>Sign up</TopBar.Button>
      </SignedOut>
    </Fragment>
  )
}

export default UserProfileButton
