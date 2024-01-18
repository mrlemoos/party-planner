/**
 * Transforms the given {@link FormData} object into a plain {@link T object} with the entries.
 */
function transformFormDataIntoObject<T extends object>(formData: FormData): T {
  return Object.fromEntries(formData.entries()) as T
}

export default transformFormDataIntoObject
