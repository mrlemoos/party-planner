import { Fragment, type ReactNode } from 'react'

import Footer from '@root/components/ui/footer'
import ProtectedTopBar from '@root/features/protected-top-bar/protected-top-bar'

/**
 * The props for the {@link ProfileLayout} component.
 */
interface ProfileLayoutProps {
  children: ReactNode
}

/**
 * The profile layout.
 */
function ProfileLayout({ children }: ProfileLayoutProps): JSX.Element {
  return (
    <Fragment>
      <ProtectedTopBar />
      {children}
      <Footer />
    </Fragment>
  )
}

export default ProfileLayout
