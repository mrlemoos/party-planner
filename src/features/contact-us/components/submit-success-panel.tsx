'use client'

import { useEffect } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Panel from '@root/components/ui/panel'

import ContactUsSearchParams from '../constants/contact-us-search-params'

/**
 * The timeout for the success panel to disappear.
 */
const SECONDS_UNTIL_TIMEOUT = 5 as const
/**
 * The timeout for the success panel to disappear in milliseconds.
 */
const MILLISECONDS_UNTIL_TIMEOUT = SECONDS_UNTIL_TIMEOUT * 1000

/**
 * The object containing the variants for the animation of the panel.
 *
 * @see https://www.framer.com/api/motion/animate-presence/#animating-presence
 * @see https://www.framer.com/api/motion/animation/#animate-presence
 */
const animationPanelVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
} as const

/**
 * Displays a success message if the message has been sent successfully.
 */
function SubmitSuccessPanel(): JSX.Element | null {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const hasMessageBeenSent =
    searchParams.get(ContactUsSearchParams.SUCCESS_QUERY_URL_SEARCH_PARAM_KEY) ===
    ContactUsSearchParams.SUCCESS_QUERY_URL_SEARCH_PARAM_VALUE

  useEffect(() => {
    if (!hasMessageBeenSent) {
      return
    }

    const timeoutId = setTimeout(() => {
      const searchParamsToReplace = new URLSearchParams(searchParams.toString())
      searchParamsToReplace.delete(ContactUsSearchParams.SUCCESS_QUERY_URL_SEARCH_PARAM_KEY)

      const href = `${pathname}?${searchParamsToReplace.toString()}`

      router.replace(href)
    }, MILLISECONDS_UNTIL_TIMEOUT * 1.5)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [hasMessageBeenSent, pathname, router, searchParams])

  return (
    <AnimatePresence>
      {hasMessageBeenSent && (
        <motion.div
          initial={animationPanelVariants.initial}
          animate={animationPanelVariants.animate}
          exit={animationPanelVariants.exit}
        >
          <Panel variant='success'>
            <Panel.SuccessIcon />
            <Panel.Message>Thank you for your message. We will get back to you as soon as possible.</Panel.Message>
            <Panel.Action variant='secondary' asChild={true}>
              <Link href='/' target='_self'>
                Back to home
              </Link>
            </Panel.Action>
          </Panel>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SubmitSuccessPanel
