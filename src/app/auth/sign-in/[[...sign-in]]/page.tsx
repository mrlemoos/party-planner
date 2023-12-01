import { type ReactElement } from 'react'

import { type Metadata } from 'next'

import SignIn from '@root/features/sign-in/sign-in'

export const metadata: Metadata = {
  title: 'Planria | Welcome back | Sign in  🎉',
  description: 'Sign in to Planria.',
}

function SignInPage(): ReactElement {
  return <SignIn />
}

export default SignInPage
