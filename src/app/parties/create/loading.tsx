'use client'

import { Fragment, useId } from 'react'

import Paragraph from '@root/components/ui/paragraph'

/**
 * The loading component for the party creation page.
 */
function PartiesCreateLoading(): JSX.Element {
  const paragraphId = useId()

  return (
    <Fragment>
      <div className='fixed inset-0 z-50 backdrop-blur-2xl' aria-hidden='true' />
      <main className='fixed left-[50%] top-[50%] -translate-x-1/2 translate-y-1/2'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <div
            className='h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 bg-transparent'
            aria-labelledby={paragraphId}
          />
          <Paragraph className='text-center' id={paragraphId}>
            Creating your party...
          </Paragraph>
        </div>
      </main>
    </Fragment>
  )
}

export default PartiesCreateLoading
