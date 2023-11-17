import * as admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'

/**
 * The service that provides access to the Firebase Admin SDK for the project to use on the server-side portion of this
 * codebase.
 */
export default class FirebaseAdminService {
  /**
   * The URL of the Firebase Realtime Database for the project.
   *
   * @see https://firebase.google.com/docs/database
   */
  public readonly REALTIME_DATABASE_URL = process.env.FIREBASE_CLIENT_DATABASE_URL
  /**
   * The object that carries the credentials for the Firebase Admin SDK. 🚨 This must only be used in the server-side
   * portion of the codebase.
   *
   * @see https://firebase.google.com/docs/admin/setup#initialize-sdk
   */
  private serviceAccount: admin.ServiceAccount | undefined

  private async loadCredentials(): Promise<admin.ServiceAccount> {
    try {
      const credentialJSONFile = await import('./_/firebase-admin-credentials.json')
      return credentialJSONFile as admin.ServiceAccount
    } catch {
      const credentialEnvironmentVariable = process.env.FIREBASE_ADMIN_CREDENTIAL_SCHEMA
      return JSON.parse(credentialEnvironmentVariable) as admin.ServiceAccount
    }
  }

  /**
   * Connects to the Firebase services and returns the Firebase Admin SDK instance for the project.
   *
   * @see {@link admin.app.App}
   */
  private async connectToFirebase(): Promise<admin.app.App> {
    const credentials = await this.loadCredentials()

    if (!this.serviceAccount) {
      this.serviceAccount = credentials
    }

    // This is the certificate that the Firebase Admin SDK will use to authenticate with the Firebase services. It is
    // generated from the `serviceAccount` object.
    const certification = admin.credential.cert(credentials)

    return admin.initializeApp({
      credential: certification,
      databaseURL: this.REALTIME_DATABASE_URL,
    })
  }

  /**
   * Creates the Firebase Admin SDK instance for the project. If the Firebase Admin SDK instance already exists, it will
   * return the existing instance.
   */
  async singleton() {
    // The various Firebase Admin SDK instances for the project. There's an issue open on Next.js's GitHub that
    // recommends using a singleton for the Firebase Admin SDK instance. This is the singleton.
    const apps = getApps()

    if (apps.length >= 1) {
      return apps[0]
    }

    const instance = await this.connectToFirebase()

    return instance
  }
}
