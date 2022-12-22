import dataBase from "../firebaseConfig.js";

const passwordforget = async (phoneNumber) => {
    let sendData = {Message : "", Error : ""};
    
    const startCountRef =
    `SignInWithPhoneNumber/+${phoneNumber.slice(0, 3)}/${phoneNumber.slice(
      3,
      phoneNumber.length
    )}`

    const ref = dataBase.ref(startCountRef);

    await ref.once("value",(snapshot) => {
        if (snapshot.exists()){
            if (snapshot.val().IsDisable === true){
                return (
                    sendData = { ...sendData,
                     Error : "Disable Account Cannot Reset Their Password !"
                    }
                );
            }
            return (
                sendData = { ...sendData,
                Message : true
                }
            );
        } else {
            return (
                sendData = {...sendData,
                 Error : "PhoneNumber Not Found !"
                }
            );
        }
    }
    
    )
    return (
        sendData
    )
    
}

export {passwordforget};