import { join } from "node:path";

import admin from "firebase-admin";

const databaseURL = "https://party-planner-723a3-default-rtdb.firebaseio.com";
const serviceAccount = require(join(__dirname, "./firebase.json"));
const credential = admin.credential.cert(serviceAccount);

export default function createFirebaseAdmin() {
  return admin.initializeApp({
    credential,
    databaseURL,
  });
}
