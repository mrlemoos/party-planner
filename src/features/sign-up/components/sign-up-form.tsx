import { SignUp as ClerkSignUp } from '@clerk/nextjs'

import Emblem from '@root/components/ui/emblem'
import Heading from '@root/components/ui/heading'
import ClerkTheme from '@root/styles/3rd-party/clerk/ClerkTheme'
import merge from '@root/util/merge'

interface SignUpFormProps {
  /**
   * The class name to apply to the root element.
   */
  className?: string
}

/**
 * The component that composes the sign up form.
 *
 * @props {@link SignUpFormProps}
 */
function SignUpForm({ className }: SignUpFormProps): JSX.Element {
  return (
    <div className={merge('flex select-none items-center gap-3 md:flex-col', className)}>
      <Emblem />
      <Heading hierarchy='h2' className='mb-6 ml-3 text-2xl md:ml-0'>
        Hey, newcomer 👋
      </Heading>
      <ClerkSignUp appearance={ClerkTheme} />
    </div>
  )
}

export default SignUpForm
