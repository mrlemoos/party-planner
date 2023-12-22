import { Fragment, type ReactNode } from 'react'

import Footer from '@root/components/ui/footer'

interface PartiesRootLayoutProps {
  children: ReactNode
}

function PartiesRootLayout({ children }: PartiesRootLayoutProps): JSX.Element {
  return (
    <Fragment>
      {children}
      <Footer />
    </Fragment>
  )
}

export default PartiesRootLayout
