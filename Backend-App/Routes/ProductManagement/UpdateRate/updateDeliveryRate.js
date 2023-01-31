import { dataBase } from "../../firebaseConfig.js";
import fs from "fs";

 const filePath = 'BufferData/deliveryRate.json';

const updateDeliveryRate = async (RefillRate, NewGasRate) => {
  let sendData = { Message: "", Error: "" };
  let createDate = new Date().toString();
  let unixTimestamp = Date.parse(createDate);

   const pathToUpdate = `DeliveryRate/${unixTimestamp}`;

    const refToUpdateRate = dataBase.ref(pathToUpdate);

      await refToUpdateRate.update(
    {
      New_Delivery_Rate: +NewGasRate,
      Refill_Delivery_Rate: +RefillRate,
      Created: createDate,
    },
    (error) => {
      if (error === null) {
        sendDeliveryRate();
        return (sendData = { ...sendData, Message: true });
      } else {
        return (sendData = { ...sendData, Error: error.message });
      }
    }
  );
    return sendData;
};

const sendDeliveryRate = async () => {
  let sendData = { Error: "" };
  const pathToUpdate = "DeliveryRate";

  const refToUpdateRate = dataBase.ref(pathToUpdate);

  try {
       await refToUpdateRate.limitToLast(2).once("value", (snapshot) => {
      // console.log(snapshot.val());
      let data = snapshot.val();

      let keys = Object.keys(data); // date as key
    
      sendData = {
        oldData: data[keys[0]],
        currentData: data[keys[1]],
        Error: null
      };
    updateDeliveryRatefile(sendData);
    });
    
  } catch (error) {
    sendData.Error = error.message;
  }

  return sendData;
};


const updateDeliveryRatefile = async (data) => {
     const jsonData = JSON.stringify(data);
       
     try {
          await fs.promises.writeFile(filePath, jsonData);
     } catch (error) {
        console.log(error.message);
     }

};

const readDeliveryRatefile = async() => {
  try {
    // read the file
    const jsonData = await fs.promises.readFile(filePath);
    //Parse the JSON data
    const data = await JSON.parse(jsonData);
     
    // console.log(data);
     return data;
} catch (error) {
    console.log(error.message);
}
};

export {updateDeliveryRate,readDeliveryRatefile,sendDeliveryRate};