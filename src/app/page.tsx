import { Fragment } from 'react'

import { type Metadata } from 'next'

import Footer from '@root/components/ui/footer'
import LandingPage from '@root/features/landing-page/landing-page'
import NonProtectedTopBar from '@root/features/non-protected-top-bar/non-protected-top-bar'

/**
 * The {@link Metadata | metadata} for the root page that will be indexed by search engines.
 */
export const metadata: Metadata = {
  title: 'Planria | Less Poker & More Planning 🎯',
  description: 'Point your tasks. Plan your sprint. Have fun.',
  keywords: ['party', 'planner', 'tasks', 'sprint', 'fun', 'planning poker', 'planning', 'poker', 'planria'],
}

/**
 * This component is used to display the root page of the app.
 */
function RootPage(): JSX.Element {
  return (
    <Fragment>
      <NonProtectedTopBar />
      <LandingPage />
      <Footer />
    </Fragment>
  )
}

export default RootPage
