import { ComponentProps, type ReactNode } from 'react'

import Card from './card'

type PickedHTMLFormAttributes = Pick<ComponentProps<'form'>, 'action' | 'className'>

interface QuickFormCardProps extends PickedHTMLFormAttributes {
  /**
   * The title of the card that sums up what the card is about, e.g. "Sign in", "Sign up".
   *
   * @example "Sign in"
   * @example "Sign up"
   */
  title: string
  /**
   * The title of the card that sums up what the card is about, e.g. "Welcome back! Let's start the party 🎉".
   *
   * @example "Welcome back! Let's start the party 🎉"
   */
  summary: string
  /**
   * The content as a custom {@link ReactNode node} of the card. Commonly a `<form>` element that contains the inputs.
   * It is rendered inside of a `<Card.Content>` component.
   */
  children: ReactNode
  /**
   * The custom {@link ReactNode node} that is rendered as the footer of the card. Commonly a `<Button>` element that
   * submits the form. It is rendered inside of a `<Card.Footer>` component.
   *
   * @example <Button>Submit</Button>
   */
  footer: ReactNode
}

/**
 * The quick form card component that applies styles for the card that contains a form and its inputs.
 *
 * @props {@link QuickFormCardProps}
 */
function QuickFormCard({ title, summary, children, footer, action, className }: QuickFormCardProps): JSX.Element {
  return (
    <Card className={className}>
      <Card.Header>
        <Card.Title className='text-3xl'>{title}</Card.Title>
        <Card.Description>{summary}</Card.Description>
      </Card.Header>
      <form action={action}>
        <Card.Content className='flex flex-col gap-4 animate-in'>{children}</Card.Content>
        <Card.Footer className='flex-col gap-3'>{footer}</Card.Footer>
      </form>
    </Card>
  )
}

export default QuickFormCard
