import merge from '@root/util/merge'

interface ShadeDecorProps {
  /**
   * The classes that are applied to the shade decor. This is merged with the
   * default classes.
   */
  className?: string
}

/**
 * The shade decor component that applies styles for the shade decorations in the background of the page, not changing
 * the content of the page nor its layout.
 *
 * @props {@link ShadeDecorProps}
 */
function ShadeDecor({ className }: ShadeDecorProps): JSX.Element {
  return <div aria-hidden='true' className={merge('fixed -z-20 h-[50vh] w-[50vw] opacity-30', className)} />
}

export default ShadeDecor
