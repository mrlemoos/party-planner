import { type ReactElement } from 'react'

import { type Metadata } from 'next'

import SignUp from '@root/features/sign-up/sign-up'

export const metadata: Metadata = {
  title: 'Planria | Sign up  🎉',
  description: 'Sign up to Planria.',
}

function SignUpPage(): ReactElement {
  return <SignUp />
}

export default SignUpPage
