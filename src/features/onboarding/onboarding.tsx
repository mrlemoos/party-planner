import { type ComponentPropsWithoutRef } from 'react'

import Link from 'next/link'

import Heading from '@root/components/ui/heading'
import Logo from '@root/components/ui/logo'
import Paragraph from '@root/components/ui/paragraph'

import SelectionPlansRow from '../plan-selection/components/selection-plans-row'
import SelectionSubmitButton from '../plan-selection/components/selection-submit-button'

/**
 * Props for the {@link Onboarding} component.
 */
type OnboardingProps = Pick<ComponentPropsWithoutRef<typeof SelectionPlansRow>, 'plans'>

/**
 * The onboarding feature component that aggregates the plan selection and the user information form.
 *
 * @props {@link OnboardingProps}
 */
function Onboarding({ plans }: OnboardingProps): JSX.Element {
  return (
    <div className='container flex flex-col items-center justify-center gap-16'>
      <Logo isAnimated={true} className='cursor-default select-none' />
      <div className='flex flex-col items-center justify-center gap-1'>
        <Heading hierarchy='h1'>Select a plan</Heading>
        <Heading hierarchy='h2' className='text-base font-normal text-gray-500'>
          No credit card. 30-day money-back guarantee. Cancel anytime.
        </Heading>
      </div>
      <SelectionPlansRow plans={plans} />
      <SelectionSubmitButton />
      <div>
        <Paragraph className='text-center text-foreground/70'>
          Under the hood, we use&nbsp;
          <Link href='https://www.stripe.com' className='font-medium'>
            Stripe
          </Link>
          &nbsp;to process your payments. That means&nbsp;
          <b>quick</b>, <b>easy</b> and <b>secure</b> payments.
        </Paragraph>
        <Paragraph className='text-center text-foreground/70'>
          Learn more about Stripe&apos;s privacy policy&nbsp;
          <Link href='https://stripe.com/en-gb/privacy' className='underline'>
            here
          </Link>
          .
        </Paragraph>
      </div>
    </div>
  )
}

export default Onboarding
