'use client'

import Paragraph from '@root/components/ui/paragraph'

import useNotFoundDetailedError from '../hooks/use-not-found-detailed-error'

/**
 * The component that homes the detailed error message for the **Not Found** feature component. This component watches
 * for the `error` query parameter in the URL and displays the detailed error message accordingly, if any.
 */
function NotFoundDetailParagraph(): JSX.Element {
  const detailedError = useNotFoundDetailedError()

  return <Paragraph className='text-center font-sans text-2xl'>{detailedError}</Paragraph>
}

export default NotFoundDetailParagraph
