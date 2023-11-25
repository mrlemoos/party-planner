import { type ReactNode } from 'react'

/**
 * Type guard that checks if the component is a valid {@link FunctionComponent | React function component}. This
 * includes function components.
 */
export default function isReactFunctionComponent<P extends object>(
  component: unknown,
): component is (props: P) => ReactNode {
  return typeof component === 'function' && String(component).includes('return React.createElement')
}
