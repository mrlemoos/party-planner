import { IsEmail } from 'class-validator'
import { type WaitList } from '@prisma/client'

import DataTransferObject from './data-transfer-object'

type PickedWaitListProps = Pick<WaitList, 'email'>

class RegisterEmailToWaitListDataTransferObject extends DataTransferObject implements PickedWaitListProps {
  /**
   * The email refers to the email address of the person who wants to be notified when the app is ready.
   *
   * @example "mia.wallace@pulp.fiction"
   */
  @IsEmail()
  public readonly email: string

  constructor(email: string) {
    super()
    this.email = email
  }
}

export default RegisterEmailToWaitListDataTransferObject
