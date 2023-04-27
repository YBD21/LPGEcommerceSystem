import { dataBase } from "../firebaseConfig.js";

const getAllUserData = async () => {
  const allUserDataPath = "SignInWithPhoneNumber/";
  const usersDataRef = dataBase.ref(allUserDataPath);

  const snapshot = await usersDataRef.once("value");

  const userInfos = snapshot.val();
  // filter out password :
  const filteredDataInfo = filterUserData(userInfos);

  console.log(filteredDataInfo);

  return filteredDataInfo;
};

const filterUserData = (data) => {
  const filteredData = {};
  Object.keys(data).forEach((countryCode) => {
    filteredData[countryCode] = {};
    Object.keys(data[countryCode]).forEach((phoneNumber) => {
      const { password, ...rest } = data[countryCode][phoneNumber];
      filteredData[countryCode][phoneNumber] = rest;
    });
  });

  return filteredData;
};

const editUserAccountType = async (
  countryCode,
  phoneNumber,
  isDisableStatus,
  accountTypeValue
) => {
  let sendData;
  const UserDataPath = `SignInWithPhoneNumber/${countryCode}/${phoneNumber}`;
  const usersDataRef = dataBase.ref(UserDataPath);

  await usersDataRef.update(
    {
      AccountType: accountTypeValue,
      IsDisable: isDisableStatus,
    },
    (error) => {
      // console.log(error);
      if (error === null) {
        return (sendData = true);
      } else {
        return (sendData = error.message);
      }
    }
  );
  return sendData;
};

export { getAllUserData, editUserAccountType };
