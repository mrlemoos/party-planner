import { SignIn as ClerkSignIn } from '@clerk/nextjs'

import Emblem from '@root/components/ui/emblem'
import Heading from '@root/components/ui/heading'
import ClerkTheme from '@root/styles/3rd-party/clerk/ClerkTheme'
import merge from '@root/util/merge'

interface SignInFormProps {
  /**
   * The class name to apply to the root element.
   */
  className?: string
}

/**
 * The component that composes the sign in form.
 *
 * @props {@link SignInFormProps}
 */
function SignInForm({ className }: SignInFormProps): JSX.Element {
  return (
    <div className={merge('flex select-none items-center gap-3 md:flex-col', className)}>
      <Emblem />
      <Heading hierarchy='h2' className='mb-6 ml-3 text-2xl md:ml-0'>
        Hey, newcomer 👋
      </Heading>
      <ClerkSignIn appearance={ClerkTheme} />
    </div>
  )
}

export default SignInForm
