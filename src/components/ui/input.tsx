import { type InputHTMLAttributes } from 'react'

import classes from '@root/util/classes'

type InputProps = InputHTMLAttributes<HTMLInputElement>

/**
 * The input component that applies styles for the user input fields.
 *
 * @props {@link InputProps}
 */
function Input({ className, type, ...props }: InputProps): JSX.Element {
  return (
    <input
      type={type}
      className={classes(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export default Input
