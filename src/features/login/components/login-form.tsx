import { Fragment } from 'react'

import ComposedInput from '@root/components/ui/composed-input'
import Label from '@root/components/ui/label'

import FormInputNames from '../constants/form-input-names'

/**
 * The component responsible for rendering the login form and controlling the error state of the form.
 */
function LoginForm(): JSX.Element {
  return (
    <Fragment>
      <div>
        <Label htmlFor={FormInputNames.Username}>E-mail/Phone</Label>
        <ComposedInput
          name={FormInputNames.Username}
          placeholder='email.address@domain.com or +44 123 456 789'
          aria-autocomplete='none'
          autoComplete='off'
          autoCapitalize='off'
        />
      </div>
      <div>
        <Label htmlFor={FormInputNames.Password}>Password</Label>
        <ComposedInput
          name={FormInputNames.Password}
          placeholder='********'
          aria-autocomplete='none'
          autoComplete='off'
          autoCapitalize='off'
        />
      </div>
    </Fragment>
  )
}

export default LoginForm
