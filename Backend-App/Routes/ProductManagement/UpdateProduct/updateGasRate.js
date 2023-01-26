import { dataBase } from "../../firebaseConfig.js";

const updateGasRate = async (RefillRate,NewGasRate) => {
  let sendData = { Message: "", Error: "" };
  let createDate = new Date().toString();
  let unixTimestamp = Date.parse(createDate);

  const pathToUpdate = `GasRate/${unixTimestamp}`;

  const refToUpdateRate = dataBase.ref(pathToUpdate);

  await refToUpdateRate.update(
    {
      New_Cylinder_Rate: +NewGasRate,
      Refill_Rate: +RefillRate,
      Created: createDate,
    },
    (error) => {
      if (error === null) {
        return (sendData = { ...sendData, Message: true });
      } else {
        return (sendData = { ...sendData, Error: error.message });
      }
    }
  );
  return sendData;
};

const sendGasRate = async () => {
  let sendData = { Error: "" };
  const pathToUpdate = "GasRate";

  const refToUpdateRate = dataBase.ref(pathToUpdate);

  try {
      refToUpdateRate.limitToLast(2).on("value", (snapshot) => {
      // console.log(snapshot.val());
      let data = snapshot.val();

      let keys = Object.keys(data); // date as key
    
      sendData = {
        oldData: data[keys[0]],
        currentData: data[keys[1]],
        Error: null
      };
    });
  } catch (error) {
    sendData.Error = error.message;
  }

  return sendData;
};

export { updateGasRate, sendGasRate };
