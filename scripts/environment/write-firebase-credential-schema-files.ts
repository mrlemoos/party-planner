import { writeFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

import { config } from 'dotenv'

// Load the .env file if the environment we're not running this through the pipeline.
config()

// The Firebase Admin SDK requires a JSON file to be present on the filesystem. So we'll write it in the
// "src/services/_/" directory, where the service layer will be able to find it.
const FIREBASE_ADMIN_CREDENTIALS_JSON_FILE_PATHNAME = join(
  process.cwd(),
  'src',
  'services',
  '_',
  'firebase-admin-credentials.json',
)
// Just like the Admin SDK, the Firebase Client SDK requires a JSON file to be present on the filesystem. So we'll write
// it in the "src/services/_/" directory, where the service layer will be able to find it.
const FIREBASE_CLIENT_CREDENTIALS_JSON_FILE_PATHNAME = join(
  process.cwd(),
  'src',
  'services',
  '_',
  'firebase-client-credentials.json',
)

const ADMIN_SDK_CREDENTIAL_SCHEMA_ENVIRONMENT_VARIABLE_KEY = 'FIREBASE_ADMIN_CREDENTIAL_SCHEMA' as const
const CLIENT_SDK_CREDENTIAL_SCHEMA_ENVIRONMENT_VARIABLE_KEY = 'NEXT_PUBLIC_FIREBASE_CLIENT_CREDENTIAL_SCHEMA' as const

type AdminCredentials = {
  [$ in
    | 'type'
    | 'project_id'
    | 'private_key_id'
    | 'private_key'
    | 'client_email'
    | 'client_id'
    | 'auth_uri'
    | 'token_uri'
    | 'auth_provider_x509_cert_url'
    | 'universe_domain']: string
}

function locateAndParseJSONEnvironmentVariable(environmentVariableKey: keyof NodeJS.ProcessEnv): AdminCredentials {
  const environmentValue = process.env[environmentVariableKey]

  if (!environmentValue) {
    throw new Error(`"${environmentVariableKey}" environment variable is not set.`)
  }

  try {
    return JSON.parse(environmentValue)
  } catch (error) {
    throw new Error(
      `"${environmentVariableKey}" environment variable is not valid JSON. Follows the original error: ${error}`,
    )
  }
}

async function writeFirebaseAdminCredentialsJSONFile(): Promise<void> {
  if ((await stat(FIREBASE_CLIENT_CREDENTIALS_JSON_FILE_PATHNAME)).isFile()) {
    throw new Error(
      `"${FIREBASE_CLIENT_CREDENTIALS_JSON_FILE_PATHNAME}" already exists. This script will not overwrite it.`,
    )
  }

  const firebaseAdminCredentials = locateAndParseJSONEnvironmentVariable(
    ADMIN_SDK_CREDENTIAL_SCHEMA_ENVIRONMENT_VARIABLE_KEY,
  )

  await writeFile(FIREBASE_ADMIN_CREDENTIALS_JSON_FILE_PATHNAME, JSON.stringify(firebaseAdminCredentials))
}

async function writeFirebaseClientCredentialsJSONFile(): Promise<void> {
  if ((await stat(FIREBASE_CLIENT_CREDENTIALS_JSON_FILE_PATHNAME)).isFile()) {
    throw new Error(
      `"${FIREBASE_CLIENT_CREDENTIALS_JSON_FILE_PATHNAME}" already exists. This script will not overwrite it.`,
    )
  }

  const firebaseClientCredentials = locateAndParseJSONEnvironmentVariable(
    CLIENT_SDK_CREDENTIAL_SCHEMA_ENVIRONMENT_VARIABLE_KEY,
  )

  await writeFile(FIREBASE_CLIENT_CREDENTIALS_JSON_FILE_PATHNAME, JSON.stringify(firebaseClientCredentials))
}

async function main() {
  await Promise.allSettled([writeFirebaseAdminCredentialsJSONFile, writeFirebaseClientCredentialsJSONFile])
  console.log('Firebase Admin and Client credential schema files have successfully been written 🎯')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
