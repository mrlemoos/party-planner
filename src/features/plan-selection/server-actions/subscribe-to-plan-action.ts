'use server'

import { redirectToSignIn } from '@clerk/nextjs/server'
import { RedirectType, redirect } from 'next/navigation'

import createAuthRepository from '@root/repositories/auth/create-auth-repository'
import createUserPlanRepository from '@root/repositories/user/plan/create-user-plan-repository'

import PlanSelectionFormField from '../constants/plan-selection-form-field'

const auth = createAuthRepository()
const userPlans = createUserPlanRepository()

/**
 * Subscribe the currently logged in user to the selected plan.
 */
async function subscribeToPlanAction(values: FormData) {
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
  } catch (error) {
    console.log(`Error subscribing user to plan: ${error}`)
  }
  return redirect('/profile', RedirectType.replace)
}

export default subscribeToPlanAction
