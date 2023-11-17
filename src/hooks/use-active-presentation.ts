'use client'

import { useEffect } from 'react'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import ArrayElement from '@root/util/array-element'

/**
 * This hook is used to cycle through a list of presentations. It is used to show a different presentation on each page
 * reload. The presentation is determined by the query parameter `presentation` or whatever string the
 * `queryParameterStateKey` is. If the query parameter is not set, the default presentation is shown.
 */
function useActivePresentation<E extends string, T extends readonly E[] | ReadonlyArray<E>>(
  presentThese: T,
  withinInterval = 5000,
  queryParameterStateKey = 'presentation',
  defaultPresentation: ArrayElement<T> = presentThese[0] as ArrayElement<T>,
) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // The presentation to show is determined by the query parameter `presentation` or whatever string the
  // `queryParameterStateKey` is. If the query parameter is not set, the default presentation is shown.
  const presentation = (searchParams.get(queryParameterStateKey) ?? defaultPresentation) as ArrayElement<
    typeof presentThese
  >

  useEffect(() => {
    const presentationIndex = presentThese.indexOf(presentation)
    const nextPresentation =
      // If the presentation is the last one, show the first one in the list. Otherwise, show the next one.
      presentationIndex === presentThese.length - 1
        ? presentThese[0]
        : presentThese[(presentationIndex + 1) % presentThese.length]

    const timeout = setTimeout(() => {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set(queryParameterStateKey, nextPresentation)

      const href = `${pathname}?${searchParams.toString()}`
      router.replace(href)
    }, withinInterval)

    return () => clearTimeout(timeout)
  }, [pathname, presentThese, presentation, queryParameterStateKey, router, searchParams, withinInterval])

  return {
    presentation,
  }
}

export default useActivePresentation
