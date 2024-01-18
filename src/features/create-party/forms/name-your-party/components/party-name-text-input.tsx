import { type JSX, type InputHTMLAttributes } from 'react'

import CreatePartyFormFieldNames from '@root/features/create-party/constants/create-party-form-field-names'

import SingularTextInput from './singular-text-input'

type HTMLInputElementAttributes = InputHTMLAttributes<HTMLInputElement>

type PickedHTMLInputElementAttributes = Pick<HTMLInputElementAttributes, 'value' | 'onChange'>

interface PartyNameTextInputProps extends PickedHTMLInputElementAttributes {}

/**
 * The wrapper component for the party name text input.
 *
 * @props {@link PartyNameTextInputProps}
 */
function PartyNameTextInput({ value, onChange }: PartyNameTextInputProps): JSX.Element {
  return (
    <SingularTextInput
      name={CreatePartyFormFieldNames.PARTY_NAME}
      className='mt-3'
      autoFocus={true}
      value={value}
      onChange={onChange}
    />
  )
}

export default PartyNameTextInput
