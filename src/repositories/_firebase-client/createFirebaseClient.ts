import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDb0fg74vynCue6EKcJJ_plhXQu6holFLY",
  authDomain: "party-planner-723a3.firebaseapp.com",
  databaseURL: "https://party-planner-723a3-default-rtdb.firebaseio.com",
  projectId: "party-planner-723a3",
  storageBucket: "party-planner-723a3.appspot.com",
  messagingSenderId: "549642314113",
  appId: "1:549642314113:web:ac2a0651e4b4ec03320880",
  measurementId: "G-FWTL8H7NPN",
};

export default function createFirebaseClient() {
  const firebase = initializeApp(firebaseConfig);

  return {
    firebase,
  };
}
