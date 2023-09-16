export default class FormValueNotProvidedError<U extends object, K = keyof U> extends Error {
  constructor(origin: string, field: K, additionalInfo?: string) {
    super(
      `${origin}: Could not set field "${String(
        field,
      )} because no value was provided and the event did not contain a target. If you are using a custom event handler, you must provide a value for "${String(
        field,
      )}". Additional information: ${additionalInfo}.`,
    );
    this.name = `FormValueNotProvidedError#${origin}`;
  }
}
