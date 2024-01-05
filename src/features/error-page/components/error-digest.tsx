/**
 * The props for the ErrorDigest component.
 */
interface ErrorDigestProps {
  digest?: string
}

/**
 * The digest is a unique identifier for the error. It is used to track the error in the logs.
 *
 * @props {@link ErrorDigestProps}
 */
function ErrorDigest({ digest }: ErrorDigestProps): JSX.Element | null {
  if (!digest) {
    return null
  }

  return <h4 className='mb-4 text-lg font-medium'>Error digest no. {digest}</h4>
}

export default ErrorDigest
