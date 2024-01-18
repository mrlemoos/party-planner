import { InputHTMLAttributes, type JSX } from 'react'

import merge from '@root/util/merge'

type HTMLInputElementAttributes = InputHTMLAttributes<HTMLInputElement>

type RememberedHTMLInputElementAttributes = Omit<HTMLInputElementAttributes, 'children' | 'type'>

interface SingularTextInputProps extends RememberedHTMLInputElementAttributes {
  /**
   * @ignore
   */
  children?: never
}

/**
 * The text input component used in the create party wizard.
 *
 * @props {@link SingularTextInputProps}
 */
function SingularTextInput({ className, name, ...props }: SingularTextInputProps): JSX.Element {
  return (
    <input
      {...props}
      className={merge(
        'w-full border-b-2 border-b-primary-foreground bg-transparent text-center text-2xl focus-within:outline-none',
        className,
      )}
      name={name}
    />
  )
}

export default SingularTextInput
