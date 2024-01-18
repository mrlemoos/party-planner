import { type Metadata } from 'next'

import CreatePartyWizardForm from '@root/features/create-party/create-party-wizard-form'
import generateRandomName from '@root/util/generate-random-name'

export const metadata: Metadata = {
  title: 'Planria | Create a party',
  robots: 'noindex, nofollow',
}

interface PartiesCreateByIdPageParams {
  /**
   * The string that identifies the party created by the `/parties/create` page.
   */
  partyId: string
}

/**
 * The interface for the props of the {@link PartiesCreateByIdPage}.
 */
interface PartiesCreateByIdPageProps {
  /**
   * @see {@link PartiesCreateByIdPageParams}
   */
  params: PartiesCreateByIdPageParams
}

/**
 * The component that composes the page of the party setup once the UUID is known.
 *
 * @props {@link PartiesCreateByIdPageProps}
 */
async function PartiesCreateByIdPage({ params: { partyId } }: PartiesCreateByIdPageProps): Promise<JSX.Element> {
  const suggestedPartyName = generateRandomName()

  return (
    <div className='container'>
      <CreatePartyWizardForm suggestedPartyName={suggestedPartyName} partyId={partyId} />
    </div>
  )
}

export default PartiesCreateByIdPage
