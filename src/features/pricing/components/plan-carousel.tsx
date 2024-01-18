import { CheckIcon } from '@radix-ui/react-icons'

import PlanCard from '@root/features/pricing/components/plan-card'
import createUserPlanRepository from '@root/repositories/user/plan/create-user-plan-repository'
import FontSansSerif from '@root/styles/fonts/font-serif-sans'
import merge from '@root/util/merge'

const userPlansRepository = createUserPlanRepository()

async function PlanCarousel(): Promise<JSX.Element> {
  const plans = await userPlansRepository.fetchUserPlans()

  return (
    <main className='flex flex-col gap-8'>
      <h1 className={merge('mt-32 text-center text-3xl font-extrabold', FontSansSerif.className)}>Pricing</h1>
      <div className='grid grid-cols-1 grid-rows-3 gap-4 lg:grid-cols-3 lg:grid-rows-1 lg:gap-9'>
        {plans.map(({ highlights, id, isComingSoon, name, period, price, updatedAt, createdAt }) => {
          const lastUpdateTimestamp = updatedAt?.toISOString() ?? createdAt?.toISOString()

          return (
            <PlanCard name={name} price={price} unit={period} isComingSoon={isComingSoon} key={id}>
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  data-last-update-timestamp={lastUpdateTimestamp}
                  className='relative flex list-none items-center gap-1'
                >
                  <CheckIcon
                    className='text-emerald-500 group-hover:text-foreground'
                    height={24}
                    width={24}
                    aria-hidden='true'
                  />
                  <span className='text-foreground/80' dangerouslySetInnerHTML={{ __html: highlight }} />
                </li>
              ))}
            </PlanCard>
          )
        })}
      </div>
      <ol className='[&>li]:text-foreground/68 text-foreground/60 [&>li]:mb-1 [&>li]:text-center'>
        <li>1. All plans are billed annually. You can cancel your subscription at any time.</li>
        <li>
          2. All plans include a 14-day free trial. You will not be charged if you cancel your subscription before the
          trial ends.
        </li>
        <li>3. Startup plan does not require your credit card information.</li>
        <li>4. Taxes may vary according to your location.</li>
      </ol>
    </main>
  )
}

export default PlanCarousel
