export default class DataTransferObjectValidationException extends Error {
  constructor(
    public readonly constraints: string[],
    public readonly dto: string,
    public readonly errorCode: string,
  ) {
    super(
      `(${errorCode}) Constraints not satisfied: ${constraints
        .map((constraint, index) => `Constraint no. ${index + 1}: ${constraint}`)
        .join(', ')}`,
    )
    this.name = 'DataTransferObjectValidationException'
  }

  getDebugObject() {
    return {
      message: this.message,
      constraints: this.constraints,
      dto: this.dto,
      errorCode: this.errorCode,
    }
  }
}
