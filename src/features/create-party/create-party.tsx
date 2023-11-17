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

function CreateParty({ partyId }: CreatePartyProps): JSX.Element {
  return (
    <AnimatedWrapper className='mx-auto lg:max-w-xl'>
      <Card>
        <AnimatedCardHeader />
        <Card.Content>
          <CopyPartyInviteInput partyId={partyId} />
        </Card.Content>
        <Card.Footer>
          <CallToActionButton href={`/parties/${partyId}/boards`} />
        </Card.Footer>
      </Card>
    </AnimatedWrapper>
  )
}

export default CreateParty
