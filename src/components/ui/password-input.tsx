'use client'

import { useCallback, useState, type ComponentPropsWithoutRef } from 'react'

import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'

import Button from './button'
import Input from './input'

/**
 * The size of the icon inside the button.
 */
const ICON_SIZE = 18

/**
 * The 'aria-label' value for the button when the password is visible.
 */
const ARIA_LABEL_HIDE_PASSWORD = 'Hide password' as const
/**
 * The 'aria-label' value for the button when the password is hidden.
 */
const ARIA_LABEL_SHOW_PASSWORD = 'Reveal password' as const

/**
 * The 'type' value for the password input.
 */
const INPUT_TYPE_TEXT = 'text' as const
/**
 * The 'type' value for the password input.
 */
const INPUT_TYPE_PASSWORD = 'password' as const

/**
 * The placeholder value for the password input when the password is hidden.
 */
const HIDDEN_INPUT_VALUE_PLACEHOLDER = '********' as const
/**
 * The placeholder value for the password input when the password is visible.
 */
const VISIBLE_INPUT_VALUE_PLACEHOLDER = 'Your password' as const

/**
 * Props for the password input component.
 */
type PasswordInputProps = Omit<ComponentPropsWithoutRef<typeof Input>, 'type'>

/**
 * The password input component that applies styles for the user password input fields.
 *
 * @props {@link PasswordInputProps}
 */
function PasswordInput(props: PasswordInputProps): JSX.Element {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const handleTogglePasswordVisibility = useCallback(() => setPasswordVisible((previous) => !previous), [])

  const type = isPasswordVisible ? INPUT_TYPE_TEXT : INPUT_TYPE_PASSWORD
  const placeholder = isPasswordVisible ? VISIBLE_INPUT_VALUE_PLACEHOLDER : HIDDEN_INPUT_VALUE_PLACEHOLDER
  const ariaLabel = isPasswordVisible ? ARIA_LABEL_SHOW_PASSWORD : ARIA_LABEL_HIDE_PASSWORD

  return (
    <div className='flex items-center gap-2'>
      <Input type={type} placeholder={placeholder} {...props} />
      <div className='mb-1'>
        <Button
          size='icon'
          type='button'
          onClick={handleTogglePasswordVisibility}
          aria-label={ariaLabel}
          variant='secondary'
        >
          {isPasswordVisible ? (
            <EyeOpenIcon height={ICON_SIZE} width={ICON_SIZE} />
          ) : (
            <EyeNoneIcon height={ICON_SIZE} width={ICON_SIZE} />
          )}
        </Button>
      </div>
    </div>
  )
}

export default PasswordInput
