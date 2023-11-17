import { type ComponentPropsWithoutRef } from 'react'

import ComposedInput from './composed-input'
import PasswordInput from './password-input'

/**
 * Props for the {@link ComposedPasswordInput} component.
 */
type ComposedPasswordInputProps = Omit<
  ComponentPropsWithoutRef<typeof PasswordInput>,
  'aria-invalid' | 'aria-errormessage' | /* NOTE: Conflict */ 'children'
>

/**
 * A component that renders a password input with an error message below it when the latter is present on the URL search
 * params object. The error message utilizes the `name` prop to identify the error message on the URL search params
 * object.
 *
 * @props {@link ComposedPasswordInputProps}
 */
function ComposedPasswordInput(props: ComposedPasswordInputProps): JSX.Element {
  return <ComposedInput {...props} ComposableComponent={PasswordInput} />
}

export default ComposedPasswordInput
