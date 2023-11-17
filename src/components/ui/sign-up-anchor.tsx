import { isValidElement, type ComponentProps } from 'react'

import Link from 'next/link'

import createSignUpURI from '@root/util/create-sign-up-uri'
import merge from '@root/util/merge'

import Button from './button'

type $$ButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'children'>

interface SignUpAnchorProps extends $$ButtonProps {
  /**
   * @ignore
   */
  children?: never
  /**
   * The URL or URI from which the user was referred from.
   */
  referral: string
}
/**
 * The error that is thrown when the {@link SignUpAnchorProps.children children} prop is defined.
 */
class SignUpAnchorChildrenDefinedException extends Error {
  constructor() {
    super('<SignUpAnchor />: The children prop is defined. This prop is not allowed to be defined.')
  }
}
/**
 * The error that is thrown when the {@link SignUpAnchorProps.referral referral} prop is not provided.
 */
class SignUpAnchorReferralPropNotProvidedException extends Error {
  constructor() {
    super('<SignUpAnchor />: The referral prop is not provided. This prop is required.')
  }
}
/**
 * The component that renders the "Not signed up yet? Create an account" text and the button that links to the sign up
 * page.
 *
 * @props {@link SignUpAnchorProps}
 */
function SignUpAnchor({ className, children, referral, ...props }: SignUpAnchorProps): JSX.Element {
  if (isValidElement(children)) {
    throw new SignUpAnchorChildrenDefinedException()
  }

  if (typeof referral !== 'string' || referral.length === 0) {
    throw new SignUpAnchorReferralPropNotProvidedException()
  }

  return (
    <div className={merge('flex items-center', className)}>
      <span>Not signed up yet?</span>
      <Button {...props} variant='link' asChild={true}>
        <Link href={createSignUpURI({ referral })} target='_self' rel='noopener noreferrer'>
          Create an account
        </Link>
      </Button>
    </div>
  )
}

export default SignUpAnchor
