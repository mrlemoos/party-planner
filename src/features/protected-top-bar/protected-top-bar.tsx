import TopBar from '@root/components/ui/top-bar'

import UserProfileButton from './components/user-profile-button'

/**
 * Component that corresponds to the protected top bar. Here we can add buttons that are protected by the authentication
 * layer.
 */
function ProtectedTopBar(): JSX.Element {
  return (
    <TopBar rightSide={<UserProfileButton />}>
      <TopBar.Button href='/?createParty=true'>Create a party</TopBar.Button>
      <TopBar.Button href={/* '/dashboard' */ '#'}>Dashboard</TopBar.Button>
    </TopBar>
  )
}

export default ProtectedTopBar
