#!/bin/bash

# Load the .env file if the environment we're not running this through the pipeline.
if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

# The Firebase Admin SDK requires a JSON file to be present on the filesystem. So we'll write it in the
# "src/services/_/" directory, where the service layer will be able to find it.
FIREBASE_ADMIN_CREDENTIALS_JSON_FILE_PATHNAME="src/services/_/firebase-admin-credentials.json"

# Just like the Admin SDK, the Firebase Client SDK requires a JSON file to be present on the filesystem. So we'll write
# it in the "src/services/_/" directory, where the service layer will be able to find it.
FIREBASE_CLIENT_CREDENTIALS_JSON_FILE_PATHNAME="src/services/_/firebase-client-credentials.json"

# Check if the files exist and write the JSON strings to them if they don't.
if [ -f "$FIREBASE_ADMIN_CREDENTIALS_JSON_FILE_PATHNAME" ]
then
  echo "\"$FIREBASE_ADMIN_CREDENTIALS_JSON_FILE_PATHNAME\" already exists. This script will not overwrite it."
else
  echo $FIREBASE_ADMIN_CREDENTIAL_SCHEMA > $FIREBASE_ADMIN_CREDENTIALS_JSON_FILE_PATHNAME
  echo "[FIREBASE CREDENTIALS] The Firebase Admin credential schema file has successfully been written 🎯"
fi

if [ -f "$FIREBASE_CLIENT_CREDENTIALS_JSON_FILE_PATHNAME" ]
then
  echo "\"$FIREBASE_CLIENT_CREDENTIALS_JSON_FILE_PATHNAME\" already exists. This script will not overwrite it."
else
  echo $NEXT_PUBLIC_FIREBASE_CLIENT_CREDENTIAL_SCHEMA > $FIREBASE_CLIENT_CREDENTIALS_JSON_FILE_PATHNAME
  echo "[FIREBASE CREDENTIALS] Firebase Admin and Client credential schema files have successfully been written 🎯"
fi