import { type HTMLAttributes } from 'react'

import Link from 'next/link'

import UserModel from '@root/models/user-model'
import createSignInURI from '@root/util/create-sign-in-uri'

import ComponentPropNotAllowedException from '@root/exceptions/component-prop-not-allowed-exception'
import Avatar from './avatar'
import Button from './button'

const REFERRAL = 'top-bar-profile-button' as const

const loginHref = createSignInURI({ referral: REFERRAL })

/**
 * The (picked) properties from the {@link UserModel}.
 */
type PickedUserModel = Pick<UserModel, 'displayName' | 'username' | 'photoURL'>
/**
 * The remembered attributes of the {@link HTMLElement}.
 */
type RememberedHTMLElementAttributes = Omit<HTMLAttributes<HTMLElement>, 'children'>
/**
 * The props for the {@link TopBarProfileButton} component.
 */
interface TopBarProfileButtonProps extends PickedUserModel, RememberedHTMLElementAttributes {
  /**
   * @ignore
   */
  children?: never
}

/**
 * The `<TopBarProfileButton />` component is a button that is used in the `<TopBar />` component to designate the
 * profile button.
 *
 * @props {@link TopBarProfileButtonProps}
 */
function TopBarProfileButton({
  children,
  displayName,
  username,
  photoURL,
}: TopBarProfileButtonProps): JSX.Element | null {
  if (typeof children !== 'undefined') {
    throw new ComponentPropNotAllowedException('TopBarProfileButton', 'children')
  }

  if (!(displayName && username && photoURL)) {
    return (
      <Button asChild={true} variant='primary' className='font-semibold'>
        <Link href={loginHref} target='_self'>
          Log In
        </Link>
      </Button>
    )
  }

  return <Avatar src={photoURL} alt={`@${username}`} fallback={displayName} />
}

export default TopBarProfileButton
