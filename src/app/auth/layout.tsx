import { type ReactElement, type ReactNode } from 'react'

import GradientBackground from '@root/components/ui/gradient-background'

interface AuthLayoutProps {
  children: ReactNode
}

function AuthLayout({ children }: AuthLayoutProps): ReactElement {
  return (
    <GradientBackground>
      <main className='flex h-screen items-center justify-center sm:justify-around'>{children}</main>
    </GradientBackground>
  )
}

export default AuthLayout
