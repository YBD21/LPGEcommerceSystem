import * as dotenv from 'dotenv'
dotenv.config();
import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

 const dataBase = admin.database();
 const fireStoreDB = admin.firestore();
 const Bucket = admin.storage().bucket();
 export {dataBase,Bucket,fireStoreDB};