import { Fragment, type ReactNode } from 'react'

import Footer from '@root/components/ui/footer'
import ProtectedTopBar from '@root/features/protected-top-bar/protected-top-bar'

interface PartiesRootLayoutProps {
  children: ReactNode
}

function PartiesRootLayout({ children }: PartiesRootLayoutProps): JSX.Element {
  return (
    <Fragment>
      <ProtectedTopBar />
      {children}
      <Footer />
    </Fragment>
  )
}

export default PartiesRootLayout
