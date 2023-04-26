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

export { getAllUserData };
