import { type ReactNode } from 'react'

import Button from '@root/components/ui/button'
import Card from '@root/components/ui/card'
import List from '@root/components/ui/list'

interface PlanCardProps {
  /**
   * The price of the plan.
   */
  price: string
  /**
   * The name of the plan.
   */
  name: string
  /**
   * Highlight of features.
   */
  children: ReactNode
  /**
   * The unit used for the price.
   *
   * @example `month`
   */
  unit: string
  /**
   * The currency used as prefix for the price.
   *
   * @example `$`
   */
  currency?: string
}

/**
 * The component that displays the price of a plan.
 *
 * @props {@link PlanCardProps}
 */
function PlanCard({ price, currency = '$', name, children, unit }: PlanCardProps): JSX.Element {
  return (
    <Card className='flex min-h-[30vh] max-w-sm flex-col p-6 sm:w-72'>
      <div className='flex-1'>
        <Card.Title className='text-3xl'>{name}</Card.Title>
        <Card.Description>
          <span className='flex items-center justify-end' aria-label={`${price} ${currency} per ${unit}`}>
            <span className='text-sm'>{currency}</span>
            <span className='mb-2 text-3xl font-bold text-white'>{price}</span>
            <span className='text-sm font-normal'>/{unit}</span>
          </span>
        </Card.Description>
        <Card.Content>
          <List>{children}</List>
        </Card.Content>
      </div>
      <Card.Footer>
        <Button disabled={true} className='w-full'>
          Coming soon
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default PlanCard
