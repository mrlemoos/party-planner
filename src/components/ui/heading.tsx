import { HTMLAttributes, isValidElement } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

const headingStylesheet = cva('scroll-m-20 tracking-tight', {
  variants: {
    hierarchy: {
      h1: 'text-4xl font-extrabold lg:text-5xl',
      h2: 'pb-2 text-3xl font-semibold first:mt-0',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-xl font-medium',
      h6: 'text-lg font-medium',
      unset: '',
    },
  },
})

type $$HTMLHeadingElementAttributes = HTMLAttributes<HTMLHeadingElement>

type HeadingProps = $$HTMLHeadingElementAttributes &
  (
    | {
        /**
         * The heading hierarchy level that is based on the HTML heading element,
         * i.e. `h1`, `h2`, `h3`, `h4`, `h5`, or `h6`.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
         */
        hierarchy: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

        /**
         * @ignore
         */
        asChild?: never
      }
    | {
        /**
         * @ignore
         */
        hierarchy?: never
        /**
         * If true, the props will be applied to child element inserted via the {@link children} instead of the root heading
         * element which will not be rendered.
         *
         * @default false
         */
        asChild: boolean
      }
  )

class HeadingHierarchyAndAsChildDefinedException extends Error {
  private static $$getSuggestion({ children }: Pick<HeadingProps, 'children'>): string {
    if (typeof children === 'string') {
      return 'As you are defining the children as a string, you might want to only define the "hierarchy" prop to render inside of a heading element.'
    }

    if (isValidElement(children)) {
      return 'As you are defining the children as a React element, you might want to only define the "asChild" prop to render a custom component inside of a heading element preventing the default heading element to be rendered but preserving the props and classes.'
    }

    return ''
  }

  constructor({ hierarchy, children }: Pick<HeadingProps, 'hierarchy' | 'children'> & Pick<HeadingProps, 'asChild'>) {
    super(
      `[<Heading />] The props "hierarchy" is defined as "${hierarchy}" and "asChild" is true at the same time. ${HeadingHierarchyAndAsChildDefinedException.$$getSuggestion(
        { children },
      )}`.trimEnd(),
    )
  }
}

class HeadingHierarchyNotAllowedException extends Error {
  constructor({ hierarchy }: Pick<HeadingProps, 'hierarchy'>) {
    super(
      `[<Heading />] The heading hierarchy level '${hierarchy}' is not allowed. Allowed values are: ${$$ALLOWED_HEADING_HIERARCHY.join(
        ', ',
      )}`,
    )
  }
}

/**
 * The allowed heading hierarchy levels. If the {@link HeadingProps.hierarchy} prop is not one of these values, the
 * component will throw an {@link HeadingHierarchyNotAllowedException error}.
 *
 * @see {@link HeadingHierarchyNotAllowedException}
 */
const $$ALLOWED_HEADING_HIERARCHY = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

/**
 * The `Heading` component is a wrapper around the HTML heading elements that provides a set of heading hierarchy levels
 * to choose from, i.e. `h1`, `h2`, `h3`, `h4`, `h5`, or `h6`.
 *
 * 🚨 **Please notice that** if the {@link HeadingProps.hierarchy hierarchy} prop is not defined and the
 * {@link HeadingProps.asChild asChild} prop is not true, the component will throw an error.
 *
 * @example
 * ```tsx
 *
 * import Heading from '@components/ui/heading'
 *
 * function MyComponent(): JSX.Element {
 *  return (
 *    <Heading hierarchy="h1">
 *      Lorem ipsum
 *    </Heading>
 *  )
 * }
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
 *
 * It is also possible to use the `Heading` component as a wrapper around other components by defining the
 * {@link HeadingProps.asChild asChild} prop. For instance, the following example will render a `Heading` component with
 * the `h1` hierarchy level that wraps a `blockquote` component:
 *
 * @example
 * ```tsx
 * import Heading from '@components/ui/heading'
 *
 * function MyComponent(): JSX.Element {
 *   return (
 *     <Heading asChild={true}>
 *       <blockquote>
 *         Lorem ipsum
 *       </blockquote>
 *     </Heading>
 *   )
 * }
 * ```
 */
function Heading({ className, children, hierarchy, asChild = false, ...props }: HeadingProps): JSX.Element {
  if (hierarchy) {
    if (asChild) {
      throw new HeadingHierarchyAndAsChildDefinedException({ hierarchy, children })
    }
    if (!$$ALLOWED_HEADING_HIERARCHY.includes(hierarchy)) {
      throw new HeadingHierarchyNotAllowedException({ hierarchy })
    }
  }

  const RenderElement = (asChild ? Slot : hierarchy) as unknown as NonNullable<HeadingProps['hierarchy']>

  return (
    <RenderElement className={headingStylesheet({ hierarchy: asChild ? 'unset' : hierarchy, className })} {...props}>
      {children}
    </RenderElement>
  )
}
export default Heading
