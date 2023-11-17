import Badge from '@root/components/ui/badge'
import TopBar from '@root/components/ui/top-bar'

import CreatePartyButton from './components/create-party-button'

/**
 * The feature that corresponds to the non-protected top bar. Here we can add buttons that are not protected by the
 * authentication layer.
 */
function NonProtectedTopBar(): JSX.Element {
  return (
    <TopBar>
      <div className='relative'>
        <TopBar.Button href='/pricing'>Pricing</TopBar.Button>
        <Badge className='absolute -top-4 right-0 text-xs' variant='secondary'>
          Soon
        </Badge>
      </div>
      <TopBar.Button href='/about-project'>About P&P</TopBar.Button>
      <TopBar.Button href='/contact-us'>Contact us</TopBar.Button>
      <CreatePartyButton />
    </TopBar>
  )
}

export default NonProtectedTopBar
