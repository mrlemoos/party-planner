'use client'

import { Fragment } from 'react'

import Button from '@root/components/ui/button'
import Heading from '@root/components/ui/heading'
import Paragraph from '@root/components/ui/paragraph'

import useComputeErrorMessage from './hooks/use-compute-error-message'

type UseComputeErrorMessageProps = Parameters<typeof useComputeErrorMessage>[0]

type PickedUseComputeErrorMessageProps = Pick<UseComputeErrorMessageProps, 'error'>

interface ErrorPageProps extends PickedUseComputeErrorMessageProps {
  /**
   * This function is provided by Next.js and attempts to recover by trying to re-render the segment.
   */
  reset(): void
}

function ErrorPage({ error, reset }: ErrorPageProps): JSX.Element {
  const errorMessage = useComputeErrorMessage({ error })

  return (
    <Fragment>
      <Heading className='mb-[10vh] text-center text-2xl font-bold' hierarchy='h1'>
        Error :/
      </Heading>
      <Paragraph className='text-center font-sans text-2xl'>{errorMessage}</Paragraph>
      <Button className='mt-8 w-full' onClick={reset}>
        Try again
      </Button>
    </Fragment>
  )
}

export default ErrorPage
