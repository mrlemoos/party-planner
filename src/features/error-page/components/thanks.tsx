import { HeartFilledIcon } from '@radix-ui/react-icons'

function Thanks(): JSX.Element {
  return (
    <div className='mt-6 flex items-center gap-8'>
      <span className='text-foreground/70'>We thank you for your support and we apologize for the inconvenience.</span>
      <HeartFilledIcon className='text-rose-500' aria-hidden='true' height={16} width={16} />
    </div>
  )
}

export default Thanks
