import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import ApiKeys from '../constants/ApiKeys';

export const myFirebase = firebase.initializeApp(ApiKeys.FirebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;