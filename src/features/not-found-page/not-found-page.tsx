import { Fragment, ReactNode } from 'react'

import Heading from '@root/components/ui/heading'

import NotFoundCallToAction from './components/not-found-call-to-action'
import NotFoundDetailParagraph from './components/not-found-detail-paragraph'

/**
 * The props of the {@link NotFoundPage} component.
 */
interface NotFoundPageProps {
  /**
   * The {@link ReactNode | custom React node} that will be rendered between the heading and the call to action.
   */
  children?: ReactNode
}

function NotFoundPage({ children }: NotFoundPageProps): JSX.Element {
  return (
    <Fragment>
      <Heading className='mb-[10vh] text-center text-2xl font-bold' hierarchy='h1'>
        Oops...
      </Heading>
      {children ?? <NotFoundDetailParagraph />}
      <NotFoundCallToAction />
    </Fragment>
  )
}

export default NotFoundPage
