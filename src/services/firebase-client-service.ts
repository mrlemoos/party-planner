import { type FirebaseApp, initializeApp, type FirebaseOptions } from 'firebase/app'

/**
 * The service that provides access to the Firebase Admin SDK for the project to use on the client- and/or server-side
 * portion of this codebase.
 *
 * @see https://npmjs.com/package/firebase
 * @see https://firebase.google.com/docs/web/setup
 */
export default class FirebaseClientService {
  /**
   * The object that carries the credentials for the Firebase Client SDK. 🚨 This must only be used in the client-
   * and/or server-side portion of the codebase.
   *
   * @see https://firebase.google.com/docs/web/setup#add-sdks-initialize
   */
  private readonly FIREBASE_CONFIG: FirebaseOptions | undefined

  private async loadClientCredentialOptions(): Promise<FirebaseOptions> {
    try {
      const credentialJSONFile = await import('./_/firebase-client-credentials.json')
      return credentialJSONFile as FirebaseOptions
    } catch {
      const credentialEnvironmentVariable = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CREDENTIAL_SCHEMA
      return JSON.parse(credentialEnvironmentVariable) as FirebaseOptions
    }
  }

  /**
   * Connects the application to Firebase and returns the Firebase Client SDK instance.
   */
  private async connect(): Promise<FirebaseApp> {
    const options = await this.loadClientCredentialOptions()

    return initializeApp(options)
  }

  // The singleton instance of the Firebase Client SDK.
  private $$singletonFirebaseClientInstance: FirebaseApp | null = null

  public async singleton(): Promise<FirebaseApp> {
    if (this.$$singletonFirebaseClientInstance === null) {
      this.$$singletonFirebaseClientInstance = await this.connect()
    }
    return this.$$singletonFirebaseClientInstance
  }
}
