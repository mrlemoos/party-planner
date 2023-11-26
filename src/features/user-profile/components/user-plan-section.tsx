'use client'

import Tooltip from '@root/components/ui/tooltip'
import type UserPlanModel from '@root/models/user-plan-model'

import usePlanSectionDialogController from '../hooks/use-plan-section-dialog-controller'

/**
 * The props for the {@link UserPlanSection} component.
 */
interface UserPlanSectionProps {
  /**
   * The {@link UserPlanModel | interface} with information about the user's current plan.
   */
  readonly userCurrentPlan: UserPlanModel
}

/**
 * The component that displays the user's current plan. Also, this component is responsible for providing the user the
 * action to change their plan (this action is provided by the `plan-selection` module.)
 *
 * @props {@link UserPlanSectionProps}
 */
function UserPlanSection({ userCurrentPlan: { price, period, name } }: UserPlanSectionProps): JSX.Element {
  const { handleOpenPlanSectionDialog } = usePlanSectionDialogController()

  return (
    <button
      className='m-0 rounded-2xl border-none bg-foreground/10 px-8 py-1'
      type='button'
      onClick={handleOpenPlanSectionDialog}
    >
      <Tooltip
        content={
          <div className='flex flex-col items-center'>
            <span className='text-base text-background'>
              <span className='font-semibold'>{price} USD</span>
              <span className='font-light'>/{period}</span>
            </span>
            <span className='text-base font-light'>Click to take a look at all plans.</span>
          </div>
        }
        hasArrow={true}
        side='right'
        sideOffset={48}
      >
        <span className='font-medium'>{name}</span>
      </Tooltip>
      <span className='font-light'>&nbsp;Plan</span>
    </button>
  )
}

export default UserPlanSection
