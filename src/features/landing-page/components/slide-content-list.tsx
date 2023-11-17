import { Fragment, type HTMLAttributes, type ReactNode } from 'react'

import Heading from '@root/components/ui/heading'
import List from '@root/components/ui/list'
import merge from '@root/util/merge'

type SlideContentListProps = Pick<HTMLAttributes<HTMLElement>, 'className' | 'children'> & {
  header: ReactNode
}

function SlideContentList({ header, className, children }: SlideContentListProps): JSX.Element {
  return (
    <Fragment>
      <Heading hierarchy='h3' className={merge('text-4xl font-semibold', className)}>
        {header}
      </Heading>
      <List className={merge('[&>li]:text-xl md:[&>li]:text-3xl')}>{children}</List>
    </Fragment>
  )
}

export default SlideContentList
