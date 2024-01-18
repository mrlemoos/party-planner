import SupabasePartiesRepository from '../_/supabase/supabase-parties-repository'

import PartiesRepository from './parties-repository'

/**
 * This function creates a {@link PartiesRepository} instance by returning an implementation of the repository.
 *
 * @example
 * ```ts
 *
 * const repo = createPartiesRepository(accessToken)
 *
 * const party = await repo.createParty("My amazing party name")
 *
 * party.name // "My amazing party name"
 * ```
 *
 * @see {@link PartiesRepository}
 */
function createPartiesRepository(accessToken: string): PartiesRepository {
  return new SupabasePartiesRepository(accessToken)
}

export default createPartiesRepository
