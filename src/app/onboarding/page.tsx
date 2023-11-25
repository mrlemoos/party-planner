import { Fragment } from 'react'

import { type Metadata } from 'next'

import Footer from '@root/components/ui/footer'
import Onboarding from '@root/features/onboarding/onboarding'
import createUserPlanRepository from '@root/repositories/user/plan/create-user-plan-repository'

/**
 * The {@link Metadata | metadata} for the page to remove the page from the search engines.
 */
export const metadata: Metadata = {
  title: 'Onboarding P&P',
  robots: 'noindex, nofollow',
}

/**
 * Fetches the user plans from the {@link createUserPlanRepository | repository}, maps through them and returns a
 * compact version of the user plans.
 */
async function fetchCompactUserPlans() {
  const repo = createUserPlanRepository()
  const plans = (await repo.fetchUserPlans()).map(({ id, name, price, period, highlights }) => ({
    id,
    name,
    price,
    period,
    highlights,
  }))
  return plans
}

async function OnboardingPage(): Promise<JSX.Element> {
  const plans = await fetchCompactUserPlans()

  return (
    <Fragment>
      <main className='container mt-20 min-h-[90vh]'>
        <Onboarding plans={plans} />
      </main>
      <Footer />
    </Fragment>
  )
}

export default OnboardingPage
