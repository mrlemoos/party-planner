import UUID from './uuid'

/**
 * The constant that represents the prefix of a ticket that is autogenerated by the system. This is used to
 * differentiate between tickets that are autogenerated by the system and tickets that are created by the user.
 */
const TICKET_AUTOGENERATED_PREFIX = '$$story$$__' as const

/**
 * Generates an internal ticket ID that is used to identify a ticket that is autogenerated by the system. This is used
 * to differentiate between tickets that are autogenerated by the system and tickets that are created by the user.
 *
 * The pattern of the internal ticket ID is:
 *
 * ```ts
 * const id = generateInternalTicketId() // $$story$$__${uuid}
 * ```
 *
 * NOTE: The `uuid` is generated by the {@link UUID.random | `UUID.random()`} function with a length of `32` characters in
 * the alphanumeric range.
 */
export default function generateInternalTicketId(): `${typeof TICKET_AUTOGENERATED_PREFIX}${string}` {
  const uuid = UUID.random()

  return `${TICKET_AUTOGENERATED_PREFIX}${uuid}`
}
