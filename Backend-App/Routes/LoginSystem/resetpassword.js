import {dataBase} from "../firebaseConfig.js";

const resetPassword = async (phoneNumber,newPassword) => {
        let sendData = {Message : "", Error : ""};
        const startCountRef =
        `SignInWithPhoneNumber/+${phoneNumber.slice(0, 3)}`;
       
        const ref = dataBase.ref(startCountRef);

        const userRef = ref.child(`${phoneNumber.slice(
            3,
            phoneNumber.length
          )}`);
 
        await userRef.update({"password": newPassword},
        (error) => {
            // console.log(error);
         if (error === null){
            return (
                sendData = {...sendData,
                 Message : true
                }
            )
         }else{
            return (
                sendData = {...sendData,
                    Error : error
                   }
            )
         }     
        }
        ); 
        return (
            sendData
        )
         
}

export {resetPassword};