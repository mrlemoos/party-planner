import { validate as validateAsync } from 'class-validator'

import DataTransferObjectValidationException from './data-transfer-object-validation-exception'

export default abstract class DataTransferObject {
  private extractErrorCode(codeIndex: number) {
    return `${this.constructor.name
      .replace(/DataTransferObject$/, '')
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .toUpperCase()}-${codeIndex.toString().padStart(3, '0')}`
  }

  /**
   * Validates the data transfer object and returns an error if there is one or undefined if there is not.
   */
  async validate(): Promise<void> {
    const errors = await validateAsync(this)

    if (errors.length > 0) {
      const constraints = errors.filter(({ constraints }) => !!constraints).map((error) => error.toString())
      const errorCode = this.extractErrorCode(constraints.length)
      const dto = this.constructor.name

      throw new DataTransferObjectValidationException(constraints, dto, errorCode)
    }
  }
}
