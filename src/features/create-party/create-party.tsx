import Card from '@root/components/ui/card'

import AnimatedCardHeader from './components/animated-card-header'
import AnimatedWrapper from './components/animated-wrapper'
import CallToActionButton from './components/call-to-action-button'
import CopyPartyInviteInput from './components/copy-party-invite-input'

interface CreatePartyProps {
  /**
   * The party ID.
   */
  partyId: string
}

/**
 * A component that composes the page to create a party and copy the invite link.
 */
function CreateParty({ partyId }: CreatePartyProps): JSX.Element {
  const href = `/parties/${partyId}/boards`

  return (
    <AnimatedWrapper className='mx-auto lg:max-w-xl'>
      <Card>
        <AnimatedCardHeader />
        <Card.Content>
          <CopyPartyInviteInput partyId={partyId} />
        </Card.Content>
        <Card.Footer>
          <CallToActionButton href={href} />
        </Card.Footer>
      </Card>
    </AnimatedWrapper>
  )
}

export default CreateParty
