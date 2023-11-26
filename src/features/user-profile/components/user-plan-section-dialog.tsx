'use client'

import { Fragment, useMemo } from 'react'

import { useSearchParams } from 'next/navigation'

import Button from '@root/components/ui/button'
import Dialog from '@root/components/ui/dialog'
import PlanSelection from '@root/features/plan-selection/plan-selection'
import type UserPlanModel from '@root/models/user-plan-model'

import subscribeToPlanAction from '@root/server-actions/subscribe-to-plan-action'
import UserProfileSearchParams from '../constants/user-profile-search-params'
import usePlanSectionDialogController from '../hooks/use-plan-section-dialog-controller'

/**
 * The props for the {@link UserPlanSectionDialog} component.
 */
interface UserPlanSectionDialogProps {
  /**
   * The {@link UserPlanModel | interface} with information about the user's current plan.
   */
  readonly userCurrentPlan: UserPlanModel
  /**
   * The list of all {@link UserPlanModel | plans}.
   */
  readonly allPlans: UserPlanModel[]
}

/**
 * The component that displays the dialog for changing the user's plan.
 *
 * @props {@link UserPlanSectionDialogProps}
 */
function UserPlanSectionDialog({ userCurrentPlan, allPlans }: UserPlanSectionDialogProps): JSX.Element {
  const { isPlanSectionDialogVisible, handleClosePlanSectionDialog } = usePlanSectionDialogController()

  const searchParams = useSearchParams()

  const selectedPlanId = searchParams.get(UserProfileSearchParams.userPlanSectionDialogSelectedPlan) ?? undefined
  const isCurrentPlanSelected = selectedPlanId === userCurrentPlan.id

  const hasFooter = useMemo(
    () => !!selectedPlanId && allPlans.some(({ id }) => id === selectedPlanId),
    [selectedPlanId, allPlans],
  )

  const subscribeUserToPlanWithSelectedPlanId = subscribeToPlanAction.bind(null, selectedPlanId)

  return (
    <Dialog isOpen={isPlanSectionDialogVisible} onClose={handleClosePlanSectionDialog} isPortal={true}>
      <Dialog.Header>
        <Dialog.CloseButton />
        <Dialog.Title className='text-center text-2xl font-semibold'>Change your plan</Dialog.Title>
        <Dialog.Description className='text-center'>
          You are currently subscribed to the <span className='font-medium'>{userCurrentPlan.name}</span> plan. To
          change your plan, select from the options below.
        </Dialog.Description>
      </Dialog.Header>
      <div className='pb-3'>
        <PlanSelection
          plans={allPlans}
          searchParamSelectionStateKey={UserProfileSearchParams.userPlanSectionDialogSelectedPlan}
        />
      </div>
      <Dialog.Footer className='mt-4 flex animate-fade-in flex-col items-center justify-center gap-3 sm:flex-col sm:justify-center [&>button]:w-96'>
        {hasFooter && (
          <Fragment>
            {isCurrentPlanSelected ? (
              <Fragment>
                <Button
                  className='pointer-events-none animate-fade-in select-none bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                  type='button'
                >
                  <span className='font-semibold'>All set</span>
                </Button>
                <span className='text-sm text-foreground/50'>This is your current plan.</span>
              </Fragment>
            ) : (
              <Fragment>
                <form action={subscribeUserToPlanWithSelectedPlanId}>
                  <Button variant='destructive' type='submit' className='animate-fade-in'>
                    Change plan
                  </Button>
                </form>
                <span className='text-sm text-foreground/50'>
                  You can revert this change at any moment. The new price will only take affect in your next bill.
                </span>
              </Fragment>
            )}
          </Fragment>
        )}
      </Dialog.Footer>
    </Dialog>
  )
}

export default UserPlanSectionDialog
