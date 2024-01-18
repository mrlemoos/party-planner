import { Fragment, type ReactNode } from 'react'

import { redirectToSignIn } from '@clerk/nextjs'
import Link from 'next/link'

import Tooltip from '@root/components/ui/tooltip'
import TopBar from '@root/components/ui/top-bar'
import TopBarProfileButton from '@root/components/ui/top-bar-profile-button'
import createAuthRepository from '@root/repositories/auth/create-auth-repository'
import CreatePartyStepper from '@root/features/create-party/create-party-stepper'
/**
 * The {@link AuthRepository} instance.
 */
const repo = createAuthRepository()

interface PartiesCreateLayoutProps {
  /**
   * The nodes to render inside the layout.
   */
  children: ReactNode
  /**
   * The search params of the page.
   */
  searchParams: never
}

async function PartiesCreateLayout({ children, searchParams }: PartiesCreateLayoutProps): Promise<JSX.Element> {
  const user = await repo.currentUser()

  if (!user) {
    return redirectToSignIn({ returnBackUrl: '/parties/create' })
  }

  const profileTooltipContent = `${user.displayName} | ${user.email}`
  const { displayName, username, photoURL } = user

  const stepName = (searchParams as { step?: 'NAME_YOUR_PARTY' | 'TEAM_INVITATION' }).step

  return (
    <Fragment>
      <TopBar
        rightSide={
          <Tooltip content={profileTooltipContent}>
            <Link className='animate-fade-in cursor-pointer' href='/profile' target='_self'>
              <TopBarProfileButton
                className='hover:shadow-2xl'
                displayName={displayName}
                username={username}
                photoURL={photoURL}
              />
            </Link>
          </Tooltip>
        }
      >
        <CreatePartyStepper currentStepKey={stepName} />
      </TopBar>
      <div className='mt-[6dvh] h-[80dvh]'>{children}</div>
    </Fragment>
  )
}

export default PartiesCreateLayout
