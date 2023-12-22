import { IsNotEmpty, IsOptional, IsUppercase } from 'class-validator'

import DataTransferObject from '@root/dto/data-transfer-object'

class RegisterTicketDataTransferObject extends DataTransferObject {
  /**
   * ID of the party to register the ticket to.
   */
  @IsNotEmpty()
  public readonly partyId: string
  /**
   * The summary of the ticket.
   *
   * @example "Create the prettiest button ever!"
   */
  @IsNotEmpty()
  public readonly ticketSummary: string
  /**
   * The ID of the ticket. For instance, if the user wants to link this ticket to an existing ticket on Jira, this field
   * should be filled with the Jira ticket ID.  Of course, this field is optional, and may be used for identifying
   * tickets on other platforms such as Monday, GitHub Projects, or Asana, for instance.  However, it must be noted that
   * it is upper-cased.
   *
   * @example 'JIRA-123'
   */
  @IsOptional()
  @IsUppercase()
  public readonly ticketId?: string

  constructor(partyId: string, ticketSummary: string, ticketId?: string) {
    super()

    this.partyId = partyId
    this.ticketSummary = ticketSummary
    this.ticketId = ticketId
  }
}

export default RegisterTicketDataTransferObject
