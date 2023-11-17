import * as admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'

import firebaseAdminCredentials from './_/firebase-admin-credentials.json'

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
  private readonly CREDENTIALS_SCHEMA = firebaseAdminCredentials as admin.ServiceAccount

  /**
   * The certificate that the Firebase Admin SDK will use to authenticate with the Firebase services. It is generated
   * from the {@link CREDENTIALS_SCHEMA | credentials schema}.
   */
  private readonly CERTIFICATION = admin.credential.cert(this.CREDENTIALS_SCHEMA)

  /**
   * Connects to the Firebase services and returns the Firebase Admin SDK instance for the project.
   */
  private connectToFirebase(): admin.app.App {
    return admin.initializeApp({
      credential: this.CERTIFICATION,
      databaseURL: this.REALTIME_DATABASE_URL,
    })
  }

  /**
   * The various Firebase Admin SDK instances for the project.
   */
  private apps = getApps()

  /**
   * The Firebase Admin SDK instance for the project.
   */
  public readonly instance = this.apps.length >= 1 ? this.apps[0] : this.connectToFirebase()
}
