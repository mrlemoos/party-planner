/**
 * Verifies whether or not the code is running on the client.
 */
function isClient(): boolean {
  return typeof window !== 'undefined'
}

export default isClient
