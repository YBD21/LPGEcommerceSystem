import { dataBase } from "../../firebaseConfig.js";
import fs from 'fs';

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
        sendGasRate();
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
       await refToUpdateRate.limitToLast(2).once("value", (snapshot) => {
      // console.log(snapshot.val());
      let data = snapshot.val();

      let keys = Object.keys(data); // date as key
    
      sendData = {
        oldData: data[keys[0]],
        currentData: data[keys[1]],
        Error: null
      };
     updateGasRatefile(sendData);
    });
    
  } catch (error) {
    sendData.Error = error.message;
  }

  return sendData;
};

 const updateGasRatefile = (data) => {
    const jsonData = JSON.stringify(data);
    const filePath = 'BufferData/gasRate.json';
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, jsonData);
      // console.log('File created successfully');
  } else {
      // console.log('File already exists');
      fs.writeFileSync(filePath, jsonData);
  }
 }

 const readGasRateFile = async() => {
   const filePath = 'BufferData/gasRate.json';

   // read the file 
   const jsonData = fs.readFileSync(filePath);

   //Parse the JSON data
   const data = await JSON.parse(jsonData);

   return data;
 
 }


export { updateGasRate, readGasRateFile, sendGasRate };
