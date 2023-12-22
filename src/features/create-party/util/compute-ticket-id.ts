import isOnlyNumbers from '@root/util/is-only-numbers'
import isUpperCased from '@root/util/is-upper-cased'

/**
 * The character that separates the project prefix from the ticket number.
 */
const SUMMARY_TICKET_SEPARATOR = '-' as const

/**
 * Computes the ticket ID from the given ticket {@link summary}.
 */
function computeTicketId(summary: string): string | undefined {
  const positionalPrefix = summary.split(' ')[0]

  const [jiraLikeProjectPrefix_, ticketNumber_] = positionalPrefix.split(SUMMARY_TICKET_SEPARATOR)

  const jiraLikeProjectPrefix = jiraLikeProjectPrefix_.trim()
  const ticketNumber = ticketNumber_.trim()

  if (isUpperCased(jiraLikeProjectPrefix) && isOnlyNumbers(ticketNumber)) {
    const jiraTicketId = `${jiraLikeProjectPrefix}${SUMMARY_TICKET_SEPARATOR}${ticketNumber}`
    return jiraTicketId
  }
}

export default computeTicketId
