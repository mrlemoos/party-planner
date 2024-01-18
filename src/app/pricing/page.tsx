import { Fragment } from 'react'
import { type Metadata } from 'next'

import Footer from '@root/components/ui/footer'
import NonProtectedTopBar from '@root/features/non-protected-top-bar/non-protected-top-bar'
import Pricing from '@root/features/pricing/pricing'

export const metadata: Metadata = {
  title: 'Planria | Pricing',
}

function PricingPage(): JSX.Element {
  return (
    <Fragment>
      <NonProtectedTopBar />
      <main className='container min-h-[86vh]'>
        <Pricing />
      </main>
      <Footer />
    </Fragment>
  )
}

export default PricingPage
