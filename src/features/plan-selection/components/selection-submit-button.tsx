'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

import Button from '@root/components/ui/button'

import PlanSelectionFormField from '../constants/plan-selection-form-field'
import PlanSelectionQueryParams from '../constants/plan-selection-query-params'
import subscribeToPlanAction from '../server-actions/subscribe-to-plan-action'

/**
 * The animation for the button container.
 */
const buttonContainerAnimation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
}

/**
 * The submit button for the plan selection form.
 */
function SelectionSubmitButton(): JSX.Element {
  const searchParams = useSearchParams()

  const selectedPlanId = searchParams.get(PlanSelectionQueryParams.selectedPlanId) ?? undefined
  const isPlanSelected = !!selectedPlanId

  return (
    <form action={subscribeToPlanAction}>
      <input name={PlanSelectionFormField.selectedPlan} className='hidden' defaultValue={selectedPlanId} />
      <AnimatePresence>
        {isPlanSelected && (
          <motion.div
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
