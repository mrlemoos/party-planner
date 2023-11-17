import { type ComponentProps } from 'react'

import classes from '@root/util/classes'

type ListProps = ComponentProps<'ul'>

function List({ children, className, ...props }: ListProps): JSX.Element {
  return (
    <ul className={classes('my-3 list-disc [&>li]:mt-2', className)} {...props}>
      {children}
    </ul>
  )
}

export default List
