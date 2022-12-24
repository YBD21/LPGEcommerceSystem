import dataBase from "../firebaseConfig.js";

const login = async(phoneNumber,password) => {
    let sendData = {Message : "", Error : ""} ;
    // console.log(typeof(phoneNumber));
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