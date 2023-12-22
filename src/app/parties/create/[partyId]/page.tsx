import CreateParty from '@root/features/create-party/create-party'
import CreatePartyStep from '@root/features/create-party/enums/create-party-step'
import generateRandomName from '@root/util/generate-random-name'

interface PartiesCreateByIdPageParams {
  /**
   * The string that identifies the party created by the `/parties/create` page.
   */
  partyId: string
}

interface PartiesCreateByIdPageSearchParams {
  /**
   * The step in the party creation process.
   */
  step?: CreatePartyStep
}

/**
 * The interface for the props of the {@link PartiesCreateByIdPage}.
 */
interface PartiesCreateByIdPageProps {
  /**
   * @see {@link PartiesCreateByIdPageParams}
   */
  params: PartiesCreateByIdPageParams
  /**
   * @see {@link PartiesCreateByIdPageSearchParams}
   */
  searchParams: PartiesCreateByIdPageSearchParams
}

/**
 * The component that composes the page of the party setup once the UUID is known.
 *
 * @props {@link PartiesCreateByIdPageProps}
 */
function PartiesCreateByIdPage({
  params: { partyId },
  searchParams: { step },
}: PartiesCreateByIdPageProps): JSX.Element {
  const suggestedPartyName = generateRandomName()

  return <CreateParty partyId={partyId} partyName={suggestedPartyName} currentStepKey={step} />
}

export default PartiesCreateByIdPage
