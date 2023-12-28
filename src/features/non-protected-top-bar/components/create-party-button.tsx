import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import Button from '@root/components/ui/button'
import FeatureFlagService from '@root/services/feature-flag-service'

/**
 * Instance of the service providing access to feature flags.
 */
const flags = new FeatureFlagService()

/**
 * The link to the "create party" page.
 */
const CREATE_PARTY_PATHNAME = '/parties/create' as const

async function CreatePartyButton(): Promise<JSX.Element | null> {
  const isCreatePartyButtonEnabled = await flags.getFeatureFlag('show-create-party-button-non-protected-top-bar')

  if (!isCreatePartyButtonEnabled) {
    return null
  }

  return (
    <Button asChild={true} variant='primary' className='rounded-xl'>
      <Link href={CREATE_PARTY_PATHNAME} target='_self' replace={true}>
        Create party
        <ArrowRightIcon className='ml-1.5' aria-hidden='true' height={18} width={18} />
      </Link>
    </Button>
  )
}

export default CreatePartyButton
