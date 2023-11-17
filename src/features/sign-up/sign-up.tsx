import SignUpForm from './components/sign-up-form'

/**
 * This is the page for creating an account. Internally, it loads a form with our authentication provider.
 */
function SignUp(): JSX.Element {
  return (
    <div className='mx-auto max-w-5xl'>
      <SignUpForm className='max-w-md' />
    </div>
  )
}

export default SignUp
