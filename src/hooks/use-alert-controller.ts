import { useMemo } from 'react'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import useTimeoutEffect from './use-timeout-effect'

/**
 * The time for the alert to be displayed. After that, it will be removed.
 */
const defaultTimeout = 5_000 as const

/**
 * The variant of the alert by the URL search param key that was used to set it.
 */
const variantBySearchParamKey = {
  error: 'error',
  success: 'success',
  warning: 'warning',
  info: 'info',
} as const

/**
 * The props of the custom React hook {@link useAlertController}.
 */
interface UseAlertControllerProps {
  /**
   * The time for the alert to be displayed. After that, it will be removed.
   *
   * @default 5_000
   */
  timeout?: number
  /**
   * The URL search param key that will be used to set the alert.
   */
  searchParamKey?: string
}

/**
 * The custom React hook to control an alert system based on the URL search params during the provided time. After the
 * time is over, the alert will be removed from the URL search params and replaces the current URL.
 *
 * In addition, this function accepts a {@link UseAlertControllerProps.searchParamKey | search param key} to set the
 * alert. If the search param key is not provided, the alert will be set by the variant of the alert.
 *
 * The time for the alert to be displayed can be customized by the {@link UseAlertControllerProps.timeout | `timeout`}
 * prop. By default, it is set to 5 seconds.
 *
 * @example
 *
 * ```ts
 * const [message, alertVariant, isAlertOpen] = useAlertController()
 * ```
 *
 * @props {@link UseAlertControllerProps}
 */
function useAlertController({ timeout = defaultTimeout, searchParamKey }: UseAlertControllerProps = {}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  /**
   * The variant of the alert by the URL search param key that was used to set it.
   */
  const variant = useMemo(() => {
    const searchParamKeys = Object.keys(variantBySearchParamKey)

    return searchParamKeys.find((searchParamKey) => searchParams.has(searchParamKey))
  }, [searchParams])

  /**
   * The message of the alert by the URL search param key that was used to set it.
   */
  const message = useMemo(() => {
    if (searchParamKey) {
      return searchParams.get(searchParamKey)
    }

    if (variant) {
      return searchParams.get(variant)
    }
  }, [searchParamKey, searchParams, variant])

  /**
   * Boolean that indicates whether or not the alert is open by checking if the variant is set in the URL search params.
   */
  const isOpen = !!variant

  useTimeoutEffect(timeout, function () {
    if (!isOpen) {
      return
    }

    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.delete(variant)

    const newPathname = newSearchParams.size >= 1 ? `${pathname}?${newSearchParams.toString()}` : pathname

    router.replace(newPathname)
  })

  return [message, variant, isOpen]
}

export default useAlertController
