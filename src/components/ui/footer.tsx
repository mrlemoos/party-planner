import { Fragment, type ComponentPropsWithoutRef } from 'react'

import { GitHubLogoIcon, LinkedInLogoIcon, Pencil1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

import FeatureFlagService from '@root/services/feature-flag-service'
import merge from '@root/util/merge'
import Button from './button'

const featureFlags = new FeatureFlagService()

const CURRENT_YEAR = new Date().getFullYear()
const COPYRIGHT_HOLDER = 'planria.com' as const

/**
 * The default children for the `<Footer />` component that is rendered when no {@link FooterProps.children children}
 * are provided.
 */
async function DefaultFooterChildren(): Promise<JSX.Element> {
  const isWaitingListEnabled = await featureFlags.getFeatureFlag('closed-to-wait-list')

  return (
    <Fragment>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-3'>
          <GitHubLogoIcon />
          <Link href='https://github.com/mrlemoos/party-planner' target='_blank'>
            GitHub
          </Link>
        </div>
        <div className='flex items-center gap-3'>
          <LinkedInLogoIcon />
          <Link href='https://linkedin.com/in/leo-lemos/' target='_blank'>
            LinkedIn
          </Link>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        {isWaitingListEnabled && (
          <Button variant='link' asChild={true}>
            <Link href='/#waiting-list-enrollment'>
              Enroll in the waiting list
              <Pencil1Icon height={18} width={18} aria-hidden='true' className='ml-1' />
            </Link>
          </Button>
        )}
        <span className='my-4 text-sm md:text-base'>
          Copyright &copy; {CURRENT_YEAR} {COPYRIGHT_HOLDER}. All rights reserved.
        </span>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-col items-center gap-1'>
          <Link href='/pricing'>Pricing</Link>
          <Link href='/#feature-highlights'>Feature Highlights</Link>
        </div>
      </div>
    </Fragment>
  )
}

/**
 * The props for the footer component.
 */
type FooterProps = ComponentPropsWithoutRef<'footer'>

/**
 * The component that represents the footer of the page. Commonly used to display the legal information and/or contact
 * information.
 *
 * @props {@link FooterProps}
 */
function Footer({ children, className, ...props }: FooterProps): JSX.Element {
  return (
    <footer
      {...props}
      className={merge(
        className,
        'flex w-full flex-col items-center justify-center bg-background p-2 md:min-h-[10vh] md:flex-row md:items-start md:justify-around md:p-4',
      )}
    >
      {children ?? <DefaultFooterChildren />}
    </footer>
  )
}

export default Footer
