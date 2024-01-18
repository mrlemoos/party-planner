'use client'

import { type ReactNode } from 'react'

import Card from '@root/components/ui/card'
import merge from '@root/util/merge'
import FontSansSerif from '@root/styles/fonts/font-serif-sans'
import FontCurrency from '@root/styles/fonts/font-currency'
import Button from '@root/components/ui/button'
import Badge from '@root/components/ui/badge'

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
  /**
   * The boolean which indicates if the plan is coming soon.
   */
  isComingSoon?: boolean
}

/**
 * The component that displays the price of a plan.
 *
 * @props {@link PlanCardProps}
 */
function PlanCard({ price, currency = '$', name, children, unit, isComingSoon }: PlanCardProps): JSX.Element {
  const isPlanFree = price === '0'

  return (
    <Card className='group relative border-emerald-500/20 bg-background p-2 transition-all hover:bg-gradient-to-br hover:from-emerald-400/80 hover:to-green-700/80 dark:border-gray-900'>
      <Card.Header className='flex select-none flex-col gap-4'>
        <Card.Title className={merge('text-2xl font-black', FontSansSerif.className)}>{name}</Card.Title>
        <div className='flex items-stretch gap-1'>
          <div className={FontCurrency.className}>
            <span className='text-5xl font-semibold'>{currency}</span>
            <span>
              <span className='text-5xl font-semibold'>{price}</span>
            </span>
          </div>
          <span className='inline'>
            {!isPlanFree && <span className='text-base font-light'>+ taxes&nbsp;</span>}
            <span className='text-xl font-light tracking-tight'>/{unit}</span>
          </span>
        </div>
      </Card.Header>
      <Card.Content className='flex min-h-[13rem] select-none flex-col gap-3'>
        {isPlanFree && (
          <span className='mb-3 text-foreground/50'>
            The perfect plan for those who want to try Planria and see if it fits their needs.
          </span>
        )}
        {children}
      </Card.Content>
      <Card.Footer>
        <Button className='w-full tracking-wide'>Choose plan</Button>
      </Card.Footer>
      {isComingSoon && (
        <Badge className='absolute -right-4 -top-2 bg-background tracking-wider' variant='outline'>
          Coming soon
        </Badge>
      )}
    </Card>
  )
}

export default PlanCard
