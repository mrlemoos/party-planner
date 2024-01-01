'use client'

import { Fragment, useCallback, useId, useMemo, type ComponentProps, type ChangeEvent as ReactChangeEvent } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import classes from '@root/util/classes'

import ErrorMessage from './error-message'
import Input from './input'

/**
 * The props for the {@link ComposedInput} component.
 */
interface ComposedInputProps extends Omit<ComponentProps<typeof Input>, 'aria-invalid' | 'aria-errormessage'> {
  /**
   * @ignore
   */
  children?: never
  /**
   * The component that is rendered for the input. This is useful for when you want to render a different component than
   * the {@link Input | default input component}.
   *
   * @default Input
   */
  ComposableComponent?: typeof Input
}

/**
 * A component that renders an input with an error message below it when the latter is present on the URL search params
 * object. The error message utilizes the `name` prop to identify the error message on the URL search params object.
 */
function ComposedInput({ name, id, onChange, ComposableComponent = Input, ...props }: ComposedInputProps): JSX.Element {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const errorSearchParam = String(name)

  // The ID of the error message element. This is used to associate the error message with the input.
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-invalid_attribute
  const errorMessageId = useId()

  const error = useMemo(
    () =>
      // Get the error message from the URL search params object.
      searchParams.get(errorSearchParam),
    [errorSearchParam, searchParams],
  )

  const handleChange = useCallback(
    (event: ReactChangeEvent<HTMLInputElement>) => {
      // If the error is present on the URL search params object, remove it.
      if (error) {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete(errorSearchParam)

        const url = new URL(pathname, window.location.href)
        url.search = newSearchParams.toString()

        replace(url.toString())
      }

      if (typeof onChange === 'function') {
        onChange(event)
      }
    },
    [error, errorSearchParam, onChange, pathname, replace, searchParams],
  )

  // NOTE: The error is a string and it has a length greater than 0. This is an abstraction to check if the error is
  // present and has a value so we don't explicitly check for the error being null or undefined in the JSX.
  const hasError = typeof error === 'string' && error.length > 0

  return (
    <Fragment>
      <ComposableComponent
        name={name}
        id={id}
        {...props}
        aria-invalid={hasError}
        aria-errormessage={errorMessageId}
        onChange={handleChange}
        className={classes('mb-1', {
          'border-red-400 transition-colors': hasError,
        })}
      />
      <div className='flex h-6 items-center'>
        {hasError && <ErrorMessage.Icon className='mr-2' aria-hidden='true' />}
        <ErrorMessage className='text-sm' id={errorMessageId}>
          {error}
        </ErrorMessage>
      </div>
    </Fragment>
  )
}

export default ComposedInput
