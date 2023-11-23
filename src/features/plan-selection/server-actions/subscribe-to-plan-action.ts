import { redirectToSignIn } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import createAuthRepository from '@root/repositories/auth/create-auth-repository'
import createUserPlanRepository from '@root/repositories/user/plan/create-user-plan-repository'

import PlanSelectionFormField from '../constants/plan-selection-form-field'

const auth = createAuthRepository()
const userPlans = createUserPlanRepository()

export default async function subscribeToPlanAction(values: FormData) {
  const user = await auth.currentUser()

  if (!user) {
    return redirectToSignIn({ returnBackUrl: '/onboarding' })
  }

  const userId = user.uid
  const planId = values.get(PlanSelectionFormField.selectedPlan)?.toString()

  if (!planId) {
    return
  }

  try {
    await userPlans.subscribeUserToPlan(userId, planId)

    redirect('/onboarding?success=true')
  } catch (error) {
    console.log(`Error subscribing user to plan: ${error}`)
  }
}
