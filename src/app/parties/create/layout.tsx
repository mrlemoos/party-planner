import { Fragment, type ReactNode } from 'react'

import { redirectToSignIn } from '@clerk/nextjs'
import Link from 'next/link'

import Tooltip from '@root/components/ui/tooltip'
import TopBar from '@root/components/ui/top-bar'
import TopBarProfileButton from '@root/components/ui/top-bar-profile-button'
import PartySetupStepIndicator from '@root/features/create-party/components/party-setup-step-indicator'
import CreatePartyStep from '@root/features/create-party/enums/create-party-step'
import createAuthRepository from '@root/repositories/auth/create-auth-repository'

/**
 * The list of steps that are part of the create party flow.
 */
const stepIdentificationLabels = Object.values(CreatePartyStep)
/**
 * The {@link AuthRepository} instance.
 */
const repo = createAuthRepository()

interface PartiesCreateSearchParams {
  /**
   * The step in the party creation process.
   */
  step?: CreatePartyStep
}

interface PartiesCreateLayoutProps {
  /**
   * The nodes to render inside the layout.
   */
  children: ReactNode
  /**
   * @see {@link PartiesCreateSearchParams}
   */
  searchParams?: PartiesCreateSearchParams
}

async function PartiesCreateLayout({
  children,
  searchParams: { step = CreatePartyStep.NAME_YOUR_PARTY } = {},
}: PartiesCreateLayoutProps): Promise<JSX.Element> {
  const user = await repo.currentUser()

  if (!user) {
    return redirectToSignIn({ returnBackUrl: '/parties/create' })
  }

  return (
    <Fragment>
      <TopBar
        rightSide={
          <Tooltip content={`${user.displayName} | ${user.email}`}>
            <Link className='animate-fade-in cursor-pointer' href='/profile' target='_self'>
              <TopBarProfileButton
                className='hover:shadow-2xl'
                displayName={user.displayName}
                username={user.username}
                photoURL={user.photoURL}
              />
            </Link>
          </Tooltip>
        }
      >
        <PartySetupStepIndicator currentStepKey={step}>
          {stepIdentificationLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </PartySetupStepIndicator>
      </TopBar>
      {children}
    </Fragment>
  )
}

export default PartiesCreateLayout
