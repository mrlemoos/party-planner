const UserProfileSearchParams = {
  /**
   * The key of the search param that indicates whether the plan section dialog is visible to the user.
   */
  isUserPlanSectionDialogOpen: 'plan-section-dialog',
  /**
   * The constant value that indicates that the plan section dialog is visible to the user. This value is used as the
   * value of the {@link UserProfileSearchParams.isUserPlanSectionDialogOpen | isUserPlanSectionDialogOpen} search
   * param.
   */
  isUserPlanSectionDialogOpenValue: 'true',
  /**
   * The key of the search param that indicates the selected plan in the plan section dialog.
   */
  userPlanSectionDialogSelectedPlan: 'selected-plan',
} as const

export default UserProfileSearchParams
