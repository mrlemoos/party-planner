'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

import Button from '@root/components/ui/button'
import subscribeToPlanAction from '@root/server-actions/subscribe-to-plan-action'

import PlanSelectionFormField from '../constants/plan-selection-form-field'
import PlanSelectionQueryParams from '../constants/plan-selection-query-params'

/**
 * The animation for the button container.
 */
const buttonContainerAnimation = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
  },
} as const

/**
 * The submit button for the plan selection form.
 */
function SelectionSubmitButton(): JSX.Element {
  const searchParams = useSearchParams()
  const selectedPlanId = searchParams.get(PlanSelectionQueryParams.selectedPlanId) ?? undefined

  const subscribeToPlanActionWithSelectedPlanId = subscribeToPlanAction.bind(null, selectedPlanId)

  const isPlanSelected = !!selectedPlanId

  return (
    <form action={subscribeToPlanActionWithSelectedPlanId}>
      <input name={PlanSelectionFormField.selectedPlan} className='hidden' defaultValue={selectedPlanId} />
      <AnimatePresence>
        {isPlanSelected && (
          <motion.div
            layout={true}
            initial={buttonContainerAnimation.initial}
            animate={buttonContainerAnimation.animate}
            exit={buttonContainerAnimation.initial}
          >
            <Button type='submit'>Continue</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

export default SelectionSubmitButton
