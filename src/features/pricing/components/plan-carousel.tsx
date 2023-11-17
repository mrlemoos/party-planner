import Badge from '@root/components/ui/badge'
import createUserPlanRepository from '@root/repositories/user/plan/create-user-plan-repository'

import PlanCard from './plan-card'

const userPlansRepository = createUserPlanRepository()

async function PlanCarousel(): Promise<JSX.Element> {
  const plans = await userPlansRepository.fetchUserPlans()

  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center gap-6 lg:flex-row'>
      {plans.map(({ highlights, id, isComingSoon, name, period, price, updatedAt, createdAt }) => {
        const lastUpdateTimestamp = updatedAt?.toISOString() ?? createdAt?.toISOString()

        return (
          <PlanCard name={name} price={price} currency='USD' unit={period} key={id}>
            {highlights.map((highlight) => (
              <li key={highlight} data-last-update-timestamp={lastUpdateTimestamp} className='relative'>
                <span dangerouslySetInnerHTML={{ __html: highlight }} />
                {isComingSoon && <Badge className='pointer-events-none absolute -right-14 top-0'>Soon</Badge>}
              </li>
            ))}
          </PlanCard>
        )
      })}
    </div>
  )
}

export default PlanCarousel
