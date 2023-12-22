/**
 * The exception that is thrown when a component does not allow a specific prop.
 */
export default class ComponentPropNotAllowedException extends Error {
  constructor(componentName: string, prop: string) {
    super(`Component ${componentName} does not allow the ${prop} prop`)
  }
}
