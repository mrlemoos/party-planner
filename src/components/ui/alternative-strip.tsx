import { type ComponentProps } from 'react'

import merge from '@root/util/merge'

type AlternativeStripProps = Omit<ComponentProps<'div'>, 'aria-hidden'>

function AlternativeStrip({ children, className, ...props }: AlternativeStripProps): JSX.Element {
  return (
    <div className={merge('flex w-full items-center justify-center gap-5', className)} {...props} aria-hidden='true'>
      <div className='h-[1px] w-full bg-gray-500 opacity-75' />
      {children}
      <div className='h-[1px] w-full bg-gray-500 opacity-75' />
    </div>
  )
}

export default AlternativeStrip
