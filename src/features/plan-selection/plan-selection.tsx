import { type ComponentPropsWithoutRef } from 'react'

import SelectionPlansRow from './components/selection-plans-row'

interface PlanSelectionProps extends Pick<ComponentPropsWithoutRef<typeof SelectionPlansRow>, 'plans'> {
  className?: string
}

function PlanSelection({ className, plans }: PlanSelectionProps): JSX.Element {
  return (
    <div className={className}>
      <SelectionPlansRow plans={plans} />
    </div>
  )
}

export default PlanSelection
