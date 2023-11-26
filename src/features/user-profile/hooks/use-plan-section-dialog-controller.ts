import { useCallback, useMemo } from 'react'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import UserProfileSearchParams from '../constants/user-profile-search-params'

/**
 * The custom React Hook that controls the visibility of the plan section dialog.
 */
export default function usePlanSectionDialogController() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  /**
   * The boolean that indicates whether the plan section dialog is visible to the user.
   */
  const isPlanSectionDialogVisible = useMemo(
    () =>
      searchParams.get(UserProfileSearchParams.isUserPlanSectionDialogOpen) ===
      UserProfileSearchParams.isUserPlanSectionDialogOpenValue,
    [searchParams],
  )

  /**
   * The function that opens the plan section dialog.
   */
  const handleOpenPlanSectionDialog = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(
      UserProfileSearchParams.isUserPlanSectionDialogOpen,
      UserProfileSearchParams.isUserPlanSectionDialogOpenValue,
    )

    const href = `${pathname}?${newSearchParams.toString()}`

    router.replace(href)
  }, [pathname, router, searchParams])

  /**
   * The function that closes the plan section dialog.
   */
  const handleClosePlanSectionDialog = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete(UserProfileSearchParams.isUserPlanSectionDialogOpen)

    const href = `${pathname}?${newSearchParams.toString()}`

    router.replace(href)
  }, [pathname, router, searchParams])

  return { handleOpenPlanSectionDialog, handleClosePlanSectionDialog, isPlanSectionDialogVisible }
}
