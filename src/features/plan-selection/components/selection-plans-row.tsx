'use client'

import { useCallback, type MouseEvent as ReactMouseEvent } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import merge from '@root/util/merge'

import PlanSelectionQueryParams from '../constants/plan-selection-query-params'

import SelectionCard from './selection-card'

/**
 * Props for the {@link Onboarding} component.
 */
interface SelectionPlansRowProps {
  /**
   * The plans to display.
   */
  plans: {
    id: string
    name: string
    price: string
    highlights: string[]
  }[]
}

function SelectionPlansRow({ plans }: SelectionPlansRowProps): JSX.Element {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedPlanId = searchParams.get(PlanSelectionQueryParams.selectedPlanId)

  const handleSelectPlan = useCallback(
    (planId: string, isSelected: boolean) => (_event: ReactMouseEvent<HTMLElement>) => {
      if (isSelected) {
        return
      }
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(PlanSelectionQueryParams.selectedPlanId, planId)

      const href = `${pathname}?${newSearchParams.toString()}`
      router.push(href)
    },
    [pathname, router, searchParams],
  )

  return (
    <div className='container flex flex-1 flex-col items-center gap-6 shadow-xl lg:flex-row'>
      {plans.map(({ id, name, price, highlights }) => {
        const isSelected = selectedPlanId === id
        return (
          <SelectionCard key={id} isSelected={isSelected} onClick={handleSelectPlan(id, isSelected)} className='gap-4'>
            <span className='text-2xl font-bold'>{name}</span>
            <span>
              <span className='text-sm font-medium'>$</span>
              <span className={merge(isSelected ? 'text-white' : 'text-foreground', 'text-2xl font-semibold')}>
                {price}
              </span>
              <span className='text-sm font-medium'>USD</span>
            </span>
            <ul>
              {highlights.map((highlight) => (
                <li key={highlight} className='flex items-center gap-2'>
                  <span className='text-lg font-medium'>✓</span>
                  <span className='text-base' dangerouslySetInnerHTML={{ __html: highlight }} />
                </li>
              ))}
            </ul>
          </SelectionCard>
        )
      })}
    </div>
  )
}

export default SelectionPlansRow
