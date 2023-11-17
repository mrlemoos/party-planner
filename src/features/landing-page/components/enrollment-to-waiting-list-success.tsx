'use client'

import { useEffect } from 'react'

import { HeartFilledIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'

import Alert from '@root/components/ui/alert'
import WaitingListFormStateQuerySearchParams from '../constants/waiting-list-form-state-query-search-params'

/**
 * The size of the icon that is displayed when the user has been enrolled to the waiting list.
 */
const ICON_SIZE = 24 as const

/**
 * The search query parameter that the component will use to determine whether to render the success message or not.
 */
const SUCCESS_RENDER_FLAG_QUERY_PARAMETER = WaitingListFormStateQuerySearchParams.success

/**
 * The time in milliseconds after which the success message will be removed from the URL, unmounting the JSX.
 */
const PRESENTATION_LIFECYCLE_TIME = 8000

const animationPreset = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 2,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
  },
}

/**
 * The client component that displays the success message after the user has been enrolled to the waiting list,
 * providing the user with a visual feedback that the enrollment was successful.
 */
function EnrollmentToWaitingListSuccess(): JSX.Element | null {
  const searchParams = useSearchParams()
  const router = useRouter()

  const isSuccess = searchParams.get(SUCCESS_RENDER_FLAG_QUERY_PARAMETER)

  useEffect(() => {
    setTimeout(() => {
      const successFlagRemovalURL = new URL(window.location.href)
      successFlagRemovalURL.searchParams.delete(SUCCESS_RENDER_FLAG_QUERY_PARAMETER)

      router.replace(successFlagRemovalURL.href)
    }, PRESENTATION_LIFECYCLE_TIME)
  }, [router])

  return (
    <AnimatePresence>
      {isSuccess && (
        <motion.div
          initial={animationPreset.initial}
          animate={animationPreset.animate}
          exit={animationPreset.exit}
          className='fixed bottom-2 left-2 right-2 z-50 flex animate-fade-in md:bottom-4 md:left-auto md:right-4'
        >
          <Alert variant='success' className='flex select-none items-center gap-2 rounded-lg'>
            <Alert.Title>Enrolled!</Alert.Title>
            <Alert.Description className='flex'>
              You have been enrolled to the waiting list. Await our contact, thank you very much
              <HeartFilledIcon className='ml-1 text-red-500' height={ICON_SIZE} width={ICON_SIZE} />
            </Alert.Description>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EnrollmentToWaitingListSuccess
