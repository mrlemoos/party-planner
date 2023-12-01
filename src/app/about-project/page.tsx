import { Fragment } from 'react'

import { type Metadata } from 'next'

import Footer from '@root/components/ui/footer'
import AboutProject from '@root/features/about-project/about-project'
import NonProtectedTopBar from '@root/features/non-protected-top-bar/non-protected-top-bar'

export const metadata: Metadata = {
  title: 'About Planria  🎉',
  description: 'Point your tasks. Plan your sprint. Have fun.',
  keywords: ['party', 'planner', 'tasks', 'sprint', 'fun', 'planning poker', 'planning', 'poker'],
}

/**
 * This component is used to display the root page of the app.
 */
function AboutProjectPage(): JSX.Element {
  return (
    <Fragment>
      <NonProtectedTopBar />
      <AboutProject />
      <Footer />
    </Fragment>
  )
}

export default AboutProjectPage
