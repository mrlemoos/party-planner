import Link from 'next/link'

import ReactMarkdown, { type Components as ReactMarkdownComponents } from 'react-markdown'
import remarkGfm from 'remark-gfm'

import merge from '@root/util/merge'

const components: ReactMarkdownComponents = {
  a: function ({ children, href: href_, target, rel, className }) {
    const href = href_ ?? ''

    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={merge('text-foreground/60 hover:underline hover:underline-offset-4', className)}
      >
        {children}
      </Link>
    )
  },
  h1: function ({ children, className, ...props }) {
    return (
      <h1 {...props} className={merge('mt-8 text-3xl font-semibold text-foreground [&>a]:text-foreground', className)}>
        {children}
      </h1>
    )
  },
  h2: function ({ children, className, ...props }) {
    return (
      <h2 {...props} className={merge('mx-3 my-1 text-2xl font-medium text-foreground', className)}>
        {children}
      </h2>
    )
  },
  h3: function ({ children, className, ...props }) {
    return (
      <h3 {...props} className={merge('mx-8 my-1 text-xl font-medium text-foreground', className)}>
        {children}
      </h3>
    )
  },
  li: function ({ children, className, ...props }) {
    return (
      <li {...props} className={merge('mx-14 my-1 list-disc text-base text-foreground', className)}>
        {children}
      </li>
    )
  },
  code: function ({ children, className, ...props }) {
    return (
      <code {...props} className={merge('rounded-sm bg-foreground/10 px-1 py-0.5 text-rose-500', className)}>
        {children}
      </code>
    )
  },
}

/**
 * The interface that maps the properties for the `<Markdown />` component.
 */
interface MarkdownProps {
  /**
   * The string to be parsed as markdown and rendered with the appropriate styles by {@link ReactMarkdown | `react-markdown`}
   * with the GitHub Flavored Markdown plugin.
   *
   * @see https://github.com/remarkjs/react-markdown
   * @see https://github.com/remarkjs/remark-gfm
   *
   * @see {@link ReactMarkdown}
   * @see {@link remarkGfm}
   */
  markup: string
}

/**
 * The component responsible for rendering markdown with the appropriate styles by {@link ReactMarkdown | `react-markdown`}
 * with the GitHub Flavored Markdown plugin. This component accepts the {@link MarkdownProps.markup | `markup`} prop,
 * which is parsed by the `react-markdown` component.
 *
 * @props {@link MarkdownProps}
 */
function Markdown({ markup }: MarkdownProps): JSX.Element {
  return (
    <ReactMarkdown rehypePlugins={[remarkGfm]} components={components}>
      {markup}
    </ReactMarkdown>
  )
}

export default Markdown
