import { type FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import firebaseClientCredentialConfig from './_/firebase-client-credential-config.json'

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
  private readonly FIREBASE_CONFIG = firebaseClientCredentialConfig

  /**
   * Connects the application to Firebase and returns the Firebase Client SDK instance.
   */
  private connect(): FirebaseApp {
    return initializeApp(this.FIREBASE_CONFIG)
  }

  // The singleton instance of the Firebase Client SDK.
  private $$singletonFirebaseClientInstance: FirebaseApp | null = null

  public get instance(): FirebaseApp {
    if (this.$$singletonFirebaseClientInstance === null) {
      this.$$singletonFirebaseClientInstance = this.connect()
    }
    return this.$$singletonFirebaseClientInstance
  }

  public readonly auth = getAuth(this.instance)
}
