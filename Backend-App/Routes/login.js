import * as dotenv from 'dotenv'
dotenv.config();
import bcrypt from "bcryptjs";
import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const dataBase = admin.database();

const login = async(phoneNumber,password) => {
    let sendData = {Message : "", Error : ""} ;
    const startCountRef =
    `SignInWithPhoneNumber/+${phoneNumber.slice(0, 3)}/${phoneNumber.slice(
      3,
      phoneNumber.length
    )}`
   
    const ref = dataBase.ref(startCountRef);

    await ref.once("value",(snapshot) => {
      // console.log(snapshot.val());
      // if phone number is found 
      if (snapshot.exists()){
         
        // check if account is disable
         if (snapshot.val().IsDisable === true)
         return (
         sendData = {...sendData,
          Error : "Disable Account"
         });

       // send hash_password to client
         return (
          sendData = {...sendData,
           Message : snapshot.val().password
          });
      }
      // if number does not match
      else{
        return (
          sendData = {...sendData,
           Error : "Incorrect Data"
          });
      }
    }

    )

  return (
   sendData 
  )
  
}

export {login};