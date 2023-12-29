'use server'

import { RedirectType, redirect } from 'next/navigation'

/**
 * The function that redirects the homepage page, replacing the current page in the history.
 *
 * Replacing the current page in the history is important to prevent the user from going back to the not found page.
 */
function redirectToHomepage() {
  redirect('/', RedirectType.replace)
}

export default redirectToHomepage
