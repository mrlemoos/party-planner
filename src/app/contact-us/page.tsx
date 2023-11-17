import { Fragment } from 'react'

import { type Metadata } from 'next'

import Footer from '@root/components/ui/footer'
import ContactUsPage from '@root/features/contact-us/contact-us-page'
import NonProtectedTopBar from '@root/features/non-protected-top-bar/non-protected-top-bar'
import createAuthRepository from '@root/repositories/auth/create-auth-repository'

/**
 * The metadata for the contact us page.
 */
export const metadata: Metadata = {
  title: 'Contact Us @ Party Planner  🎉',
  description: 'Point your tasks. Plan your sprint. Have fun.',
  keywords: [
    'party',
    'planner',
    'tasks',
    'sprint',
    'fun',
    'planning poker',
    'planning',
    'poker',
    'contact us',
    'contact',
    'us',
  ],
}

/**
 * The function that gets the default values for the contact us form, if these form values exist.
 */
async function getFormDefaultValues() {
  const authRepo = createAuthRepository()

  try {
    const user = await authRepo.currentUser()

    if (!user) {
      return {}
    }

    const email = user.email

    if (user.displayName) {
      if (user.displayName.includes(' ')) {
        const [firstName, lastName] = user.displayName.split(' ')
        return {
          firstName,
          lastName,
          email,
        }
      }

      return {
        firstName: user.displayName,
        email,
      }
    }

    return {
      email,
    }
  } catch (error) {
    console.error(error)
    return {}
  }
}

/**
 * This page is the contact us page.
 */
async function ContactPage(): Promise<JSX.Element> {
  const { firstName, lastName, email } = await getFormDefaultValues()

  return (
    <Fragment>
      <NonProtectedTopBar />
      <ContactUsPage defaultEmailValue={email} defaultFirstNameValue={firstName} defaultLastNameValue={lastName} />
      <Footer />
    </Fragment>
  )
}

export default ContactPage
