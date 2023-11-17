import { Fragment, type ReactNode } from 'react'

import ShadeDecor from '@root/components/ui/shade-decor'

interface GradientBackgroundProps {
  children: ReactNode
}

function GradientBackground({ children }: GradientBackgroundProps): JSX.Element {
  return (
    <Fragment>
      {children}

      <ShadeDecor className='-bottom-[28vh] -right-[30vh] -rotate-[20deg] bg-collaboration' />
      <ShadeDecor className='-left-[42vh] -top-[30vh] -rotate-12 bg-planning' />
      <ShadeDecor className='-bottom-[30vh] -left-[30vh] -rotate-6 bg-points' />
      <ShadeDecor className='-right-[34vh] -top-[30vh] -rotate-[24deg] bg-fun' />
    </Fragment>
  )
}

export default GradientBackground
