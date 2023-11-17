import Heading from '@root/components/ui/heading'
import QuickFormCard from '@root/components/ui/quick-form-card'
import SignUpAnchor from '@root/components/ui/sign-up-anchor'

import FadingHeading from './components/fading-heading'
import LoginForm from './components/login-form'
import SubmitButton from './components/submit-button'
import login from './server-actions/login'

const REFERRAL_KEY = 'login' as const

function LoginFeature(): JSX.Element {
  return (
    <div className='mx-auto max-w-5xl'>
      <div className='flex max-w-md select-none items-center gap-3 md:flex-col'>
        <Heading hierarchy='h2' className='mb-6 ml-3 text-3xl font-semibold md:ml-0'>
          Welcome back 🎉
        </Heading>
        <FadingHeading />
      </div>
      <QuickFormCard
        title='Log in'
        summary="Welcome back! Go on in and let's start the party 🎉"
        action={login}
        footer={<SubmitButton />}
      >
        <LoginForm />
      </QuickFormCard>
      <div className='mt-6 flex justify-center'>
        <SignUpAnchor referral={REFERRAL_KEY} />
      </div>
    </div>
  )
}

export default LoginFeature
