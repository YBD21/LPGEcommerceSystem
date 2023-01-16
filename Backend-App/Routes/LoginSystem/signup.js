import {dataBase} from "../firebaseConfig.js";

const createAccount = async (
  phoneNumber,
  newPassword,
  firstName,
  lastName,
  dateCreated
) => {
  let sendData = { Message: "", Error: "" };
  let userExist = false;
  const startCountRef = `SignInWithPhoneNumber/+${phoneNumber.slice(
    0,
    3
  )}/${phoneNumber.slice(3, phoneNumber.length)}`;

  const ref = dataBase.ref(startCountRef);

  await ref.once("value", (snapshot) => {
    // console.log(snapshot.val());
    // if phone number is found
    if (snapshot.exists()) {
      userExist = true;
      return (sendData = {
        ...sendData,
        Error: `${snapshot.val().PhoneNumber} is already registered !`,
      });
    }
  });

  if (!userExist) {
    const createAccountRef = `SignInWithPhoneNumber/+${phoneNumber.slice(0, 3)}/${phoneNumber.slice(3)}`;
    const refToCreateAccount = dataBase.ref(createAccountRef);
    
    await refToCreateAccount.update(
      ({
        Created: dateCreated,
        FirstName: firstName,
        LastName: lastName,
        PhoneNumber: phoneNumber.slice(3),
        lastSeen: dateCreated,
        password: newPassword,
      }),
      (error) => {
        if (error === null) {
          return (sendData = { ...sendData, Message: true });
        } else {
          return (sendData = { ...sendData, Error: error });
        }
      }
    );
  }

  return sendData;
};

export { createAccount };
