'use server'

import { redirectToSignIn } from '@clerk/nextjs/server'
import { RedirectType, redirect } from 'next/navigation'

import createAuthRepository from '@root/repositories/auth/create-auth-repository'
import createUserPlanRepository from '@root/repositories/user/plan/create-user-plan-repository'

const auth = createAuthRepository()
const userPlans = createUserPlanRepository()

/**
 * Subscribe the currently logged in user to the selected plan.
 *
 * @example
 * ```tsx
 *
 * function PlanSelectionForm(): JSX.Element {
 *  const subscribeToPlanActionWithFieldName = subscribeToPlanAction.bind(null, '{{selectedPlanId}}')
 *
 *  return (
 *   <Form onSubmit={subscribeToPlanActionWithFieldName} />
 *  )
 * }
 *
 * ```
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/server-actions#binding-arguments}
 */
async function subscribeToPlanAction(planId: string | undefined) {
  if (!planId) {
    return
  }

  const user = await auth.currentUser()

  if (!user) {
    return redirectToSignIn({ returnBackUrl: '/onboarding' })
  }

  const userId = user.uid

  if (!planId) {
    return
  }

  try {
    await userPlans.subscribeUserToPlan(userId, planId)
  } catch (error) {
    console.log(`Error subscribing user to plan: ${error}`)
  }
  return redirect('/profile', RedirectType.replace)
}

export default subscribeToPlanAction
