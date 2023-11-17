import { type ComponentProps } from 'react'

import classes from '@root/util/classes'

type SmallProps = ComponentProps<'small'>

/**
 * The `Small` component is a wrapper for the `<small>` HTML element with the styles defined by ShadCN.
 *
 * @props {@link SmallProps}
 */
function Small({ children, className, ...props }: SmallProps): JSX.Element {
  return (
    <small className={classes('text-sm font-medium leading-none', className)} {...props}>
      {children}
    </small>
  )
}

export default Small
