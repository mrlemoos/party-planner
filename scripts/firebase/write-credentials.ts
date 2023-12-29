const firebaseAdminCredentialSchema = process.env.FIREBASE_ADMIN_CREDENTIAL_SCHEMA
const firebaseClientCredentialSchema = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CREDENTIAL_SCHEMA

if (!(firebaseAdminCredentialSchema && firebaseClientCredentialSchema)) {
  throw new Error(
    'We were unable to find the firebase credential schema. Please make sure the following environment variables are set up properly: FIREBASE_ADMIN_CREDENTIAL_SCHEMA and NEXT_PUBLIC_FIREBASE_CLIENT_CREDENTIAL_SCHEMA',
  )
}

const FIREBASE_ADMIN_CREDENTIAL_FILE_DESTINATION = 'src/services/_/firebase-admin-credentials.json' as const
const FIREBASE_CLIENT_CREDENTIAL_FILE_DESTINATION = 'src/services/_/firebase-client-credentials.json' as const

async function writeFirebaseCredentials(destination: string, data: string) {
  const writtenBytes = await Bun.write(destination, data, {
    createPath: true,
  })

  if (writtenBytes === 0) {
    throw new Error(`Unable to write firebase credentials to ${destination}`)
  }

  console.log(`[SCRIPT] Writing Firebase Credentials: Successfully wrote firebase credentials to ${destination}`)
}

async function main() {
  await writeFirebaseCredentials(FIREBASE_ADMIN_CREDENTIAL_FILE_DESTINATION, firebaseAdminCredentialSchema)
  await writeFirebaseCredentials(FIREBASE_CLIENT_CREDENTIAL_FILE_DESTINATION, firebaseClientCredentialSchema)
}

main()
