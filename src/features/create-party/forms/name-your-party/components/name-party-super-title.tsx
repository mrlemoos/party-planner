import { type JSX } from 'react'

import { IdCardIcon } from '@radix-ui/react-icons'

import merge from '@root/util/merge'
import FontSansSerif from '@root/styles/fonts/font-serif-sans'

function NamePartySuperTitle(): JSX.Element {
  return (
    <div className='flex flex-col gap-8'>
      <div>
        <div className='flex justify-center'>
          <IdCardIcon height={48} width={48} className='text-foreground' aria-hidden='true' />
        </div>
        <h1 className={merge('mb-4 text-center text-3xl font-bold', FontSansSerif.className)}>Name your party</h1>
        <span className='relative text-foreground/70'>
          We give you a suggested name, but you can change it to whatever you want. You can use any characters you want
          or even emojis&nbsp;
          <span className='absolute -right-2 -top-6 text-2xl' aria-hidden='true'>
            😊
          </span>
        </span>
      </div>
    </div>
  )
}

export default NamePartySuperTitle
