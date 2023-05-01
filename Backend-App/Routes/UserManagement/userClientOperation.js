import { dataBase } from "../firebaseConfig.js";

const updateUserName = async (firstName, lastName, userId) => {
  const countryCode = userId.slice(0, 3);
  const phoneNumber = userId.slice(3, userId.length);
  let sendData = {};

  const startCountRef = `SignInWithPhoneNumber/+${countryCode}/${phoneNumber}`;

  const ref = dataBase.ref(startCountRef);

  // update firstName and LastName
  await ref.update({
    FirstName: firstName,
    LastName: lastName,
  });

  // getUpdated data from Database
  await ref.once("value", (snapshot) => {
    const firstName = snapshot.val().FirstName;
    const lastName = snapshot.val().LastName;
    const role = snapshot.val().AccountType;
    return (sendData = { firstName, lastName, role, userId });
  });

  // return firstName , lastName , role and userId
  return sendData;
};

const deleteAccountfromDatabase = async (userId) => {
  const countryCode = userId.slice(0, 3);
  const phoneNumber = userId.slice(3, userId.length);
  let sendData = false;

  const startCountRef = `SignInWithPhoneNumber/+${countryCode}/${phoneNumber}`;

  const ref = dataBase.ref(startCountRef);

  await ref
    .remove()
    .then(() => {
      console.log(`Account of ID : ${userId} has been deleted successfully`);
      sendData = true;
    })
    .catch((error) => {
      console.error(`Error deleting Account ID : ${userId} , Error :`, error);
    });

  return sendData;
};

export { updateUserName, deleteAccountfromDatabase };
