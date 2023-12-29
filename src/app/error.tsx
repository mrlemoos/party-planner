'use client'

import ErrorPage from '@root/features/error-page/error-page'
import FontLogo from '@root/styles/fonts/font-logo'
import FontSans from '@root/styles/fonts/font-sans'
import merge from '@root/util/merge'

interface ErrorProps {
  /**
   * The error that caused the segment to fail.
   */
  error?: Error & { digest?: string }
  /**
   * Provided by Next.js, this function attempts to recover by trying to re-render the segment.
   */
  reset(): void
}

/**
 * The error fallback component.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error
 */
function Error({ error, reset }: ErrorProps): JSX.Element {
  return (
    <div className={merge('mt-8', FontSans.className)}>
      <header className='mx-auto my-auto w-14'>
        <span className={merge(FontLogo.className, 'text-lg text-foreground')}>Planria</span>
      </header>
      <ErrorPage error={error} reset={reset} />
    </div>
  )
}

export default Error
