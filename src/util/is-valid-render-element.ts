import { type ReactElement, isValidElement } from 'react'

/**
 * The function that checks whether or not the given element is a valid React render element.
 *
 * @see https://reactjs.org/docs/react-api.html#isvalidelement
 * @see {@link isValidElement}
 * @see {@link ReactElement}
 */
export default function isValidRenderElement<P>(element: unknown): element is ReactElement<P> {
  return typeof element === 'string' || isValidElement(element)
}
