import 'server-only'
import { get, getAll, has } from '@vercel/edge-config'

import type MappedFeatureFlags from './mapped-feature-flags'

class FeatureFlagService {
  /**
   * The prefix that is used to identify feature flags in the project's Edge Config.
   */
  private readonly FEATURE_FLAG_PREFIX = 'flag__' as const

  /**
   * Concatenates the feature flag prefix to the feature flag name, then returns the concatenated string in the
   * following format: `flag__<environment>__<featureFlag>`, *e.g.*, `flag__production__my-feature-flag`.
   */
  private concatFeatureFlagPrefix<K extends keyof MappedFeatureFlags>(
    featureFlag: K,
  ): `${typeof this.FEATURE_FLAG_PREFIX}${typeof process.env.VERCEL_ENV}__${K}` {
    const environment = process.env.VERCEL_ENV

    return `${this.FEATURE_FLAG_PREFIX}${environment}__${featureFlag}`
  }

  /**
   * Gets the value of a feature flag. If the feature flag is not configured on the project, it will return `undefined`.
   * If the feature flag is configured on the project, but it is not enabled or disabled, it will return `undefined`.
   * If the feature flag is configured on the project and it is enabled or disabled, it will return the value of the
   * feature flag.
   *
   * @see https://vercel.com/docs/storage/edge-config
   */
  async getFeatureFlag<K extends keyof MappedFeatureFlags, T extends MappedFeatureFlags[K]>(
    featureFlag: K,
  ): Promise<T | undefined> {
    const featureFlagName = this.concatFeatureFlagPrefix(featureFlag)
    const featureFlagValue = await get<T>(featureFlagName)

    return featureFlagValue
  }

  /**
   * Checks if a feature flag is configured on the project. DO NOT use this method to check if a feature flag is enabled
   * or disabled. Use {@link getFeatureFlag} instead.
   *
   * @see {@link getFeatureFlag}
   */
  async hasFeatureFlag<K extends keyof MappedFeatureFlags>(featureFlag: K): Promise<boolean> {
    const featureFlagName = this.concatFeatureFlagPrefix(featureFlag)
    const isFeatureFlagConfigurationPresent = await has(featureFlagName)

    return isFeatureFlagConfigurationPresent
  }

  /**
   * Fetches and returns all of the feature flags that are currently configured on the project. This is useful for
   * debugging purposes.
   */
  async getFeatureFlags(): Promise<{
    [K in `${typeof this.FEATURE_FLAG_PREFIX}${keyof MappedFeatureFlags}`]: MappedFeatureFlags[keyof MappedFeatureFlags]
  }> {
    const featureFlags = await getAll<{
      [K in `${typeof this.FEATURE_FLAG_PREFIX}${keyof MappedFeatureFlags}`]: MappedFeatureFlags[keyof MappedFeatureFlags]
    }>()

    return featureFlags
  }
}

export default FeatureFlagService
