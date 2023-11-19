import Badge from '@root/components/ui/badge'
import createUserPlanRepository from '@root/repositories/user/plan/create-user-plan-repository'

import PlanCard from './plan-card'

const userPlansRepository = createUserPlanRepository()

async function PlanCarousel(): Promise<JSX.Element> {
  const plans = await userPlansRepository.fetchUserPlans()

  return (
    <div className='mt-32 grid grid-cols-1 grid-rows-3 gap-4 lg:grid-cols-3 lg:grid-rows-1 lg:gap-9'>
      {plans.map(({ highlights, id, isComingSoon, name, period, price, updatedAt, createdAt }) => {
        const lastUpdateTimestamp = updatedAt?.toISOString() ?? createdAt?.toISOString()

        return (
          <PlanCard name={name} price={price} currency='USD' unit={period} key={id}>
            {highlights.map((highlight) => (
              <li key={highlight} data-last-update-timestamp={lastUpdateTimestamp} className='relative'>
                <span dangerouslySetInnerHTML={{ __html: highlight }} />
                {isComingSoon && (
                  <Badge className='pointer-events-none absolute -right-14 top-0' variant='secondary'>
                    Soon
                  </Badge>
                )}
              </li>
            ))}
          </PlanCard>
        )
      })}
    </div>
  )
}

export default PlanCarousel
