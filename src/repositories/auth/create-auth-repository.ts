import type AuthRepository from './auth-repository'
import ClerkAuthRepository from '../_/clerk/clerk-auth-repository'

/**
 * As a factory, this function creates an instance of {@link AuthRepository} and returns it.
 *
 * @see {@link AuthRepository}
 */
function createAuthRepository(): AuthRepository {
  return new ClerkAuthRepository()
}

export default createAuthRepository
