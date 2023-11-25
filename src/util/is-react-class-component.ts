import { type ComponentClass } from 'react'

/**
 * Type guard that checks if the component is a valid {@link ComponentClass | React class component}. This includes
 * class components.
 */
export default function isReactClassComponent<P extends object>(component: unknown): component is ComponentClass<P> {
  return typeof component === 'function' && !!component.prototype?.isReactComponent
}
