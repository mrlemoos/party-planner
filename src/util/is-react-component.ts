import { type ComponentType } from 'react'

import isReactClassComponent from './is-react-class-component'
import isReactFunctionComponent from './is-react-function-component'

/**
 * Type guard that checks if the component is a valid {@link ComponentType | React component}. This includes
 * {@link isReactClassComponent | class components} and {@link isReactFunctionComponent | function components}.
 *
 * @see {@link isReactClassComponent}
 * @see {@link isReactFunctionComponent}
 */
export default function isReactComponent<P extends object>(component: unknown): component is ComponentType<P> {
  return isReactFunctionComponent(component) || isReactClassComponent(component)
}
