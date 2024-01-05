'use client'

import { Fragment } from 'react'

import Button from '@root/components/ui/button'
import Copyright from '@root/components/ui/copyright'
import DangerPanel from '@root/components/ui/danger-panel'
import Paragraph from '@root/components/ui/paragraph'

import ErrorDigest from './components/error-digest'
import ReportIssue from './components/report-issue'
import Thanks from './components/thanks'
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
      <h1 className='text-center text-xl font-semibold'>Sorry 😢</h1>
      <h2 className='text-center text-lg font-medium'>An unexpected error occurred</h2>
      <h3 className='my-8 text-base text-foreground/50'>
        As Planria&apos;s development progresses, we hope to count on your support to report bugs on our GitHub issues
        page so we can make Planria the best open-source planning poker for you!
      </h3>
      <DangerPanel className='flex gap-3'>
        <div className='h-full'>
          <DangerPanel.Icon size={24} />
        </div>
        <div className='flex-1'>
          <ErrorDigest digest={error?.digest} />
          <Paragraph className='font-sans text-xl'>{errorMessage}</Paragraph>
        </div>
      </DangerPanel>
      <div className='flex justify-center'>
        <Button className='mt-8' onClick={reset}>
          Try again
        </Button>
      </div>
      <ReportIssue />
      <Thanks />
      <Copyright className='absolute bottom-2 left-[50%] translate-x-[-50%] text-center' />
    </Fragment>
  )
}

export default ErrorPage
