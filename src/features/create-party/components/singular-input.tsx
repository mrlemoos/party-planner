import { Fragment, useCallback, type InputHTMLAttributes, type FocusEvent as ReactFocusEvent } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import ErrorMessage from '@root/components/ui/error-message'
import ComponentPropNotAllowedException from '@root/exceptions/component-prop-not-allowed-exception'
import merge from '@root/util/merge'

interface SingularInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * @ignore
   */
  children?: never
}

/**
 * An input with a single line of text and should be used onscreen as the only input.
 *
 * @props {@link SingularInputProps}
 */
function SingularInput({ className, children, onFocus, ...props }: SingularInputProps): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  if (typeof children !== 'undefined') {
    throw new ComponentPropNotAllowedException('SingularInput', 'children')
  }

  const error = searchParams.get('error')
  const hasError = !!error && typeof error === 'string' && error.length > 0

  const handleFocus = useCallback(
    (event: ReactFocusEvent<HTMLInputElement>) => {
      if (typeof onFocus === 'function') {
        onFocus(event)
      }

      if (error) {
        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.delete('error')

        const href = newSearchParams.size >= 1 ? `${pathname}?${newSearchParams.toString()}` : pathname

        router.push(href)
      }
    },
    [error, pathname, router, searchParams, onFocus],
  )

  return (
    <Fragment>
      <input
        onFocus={handleFocus}
        className={merge(
          'w-full border-b-2 bg-transparent text-center text-2xl font-semibold outline-none',
          'caret-purple-700 dark:caret-indigo-300',
          'border-b-foreground dark:border-b-gray-800',
          'focus-within:border-b-purple-700/50 dark:focus-within:hover:border-b-indigo-400/50',
          className,
        )}
        {...props}
      />
      {hasError && (
        <div className='mb-3 mt-0 flex items-center'>
          <ErrorMessage.Icon className='mr-1' />
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      )}
    </Fragment>
  )
}

export default SingularInput
