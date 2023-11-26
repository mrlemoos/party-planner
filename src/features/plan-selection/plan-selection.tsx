import { type ComponentPropsWithoutRef } from 'react'

import SelectionPlansRow from './components/selection-plans-row'

interface PlanSelectionProps
  extends Pick<ComponentPropsWithoutRef<typeof SelectionPlansRow>, 'plans' | 'searchParamSelectionStateKey'> {
  className?: string
}

function PlanSelection({ className, plans, searchParamSelectionStateKey }: PlanSelectionProps): JSX.Element {
  return (
    <div className={className}>
      <SelectionPlansRow plans={plans} searchParamSelectionStateKey={searchParamSelectionStateKey} />
    </div>
  )
}

export default PlanSelection
