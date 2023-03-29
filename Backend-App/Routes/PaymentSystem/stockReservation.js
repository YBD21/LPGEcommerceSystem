import fs from "fs";
import { subtractQuantityFromDatabase } from "../ProductManagement/UpdateProduct/updateProduct.js";
import { releaseStockOnDisconnect } from "./paymentSystemRouter.js";
const filePath = "BufferData/stockReservationRecord.json";

const updateStockReservationRecord = async (stockReservation) => {
  // Read the existing stock reservation data.
  let prevData = await readStockReservationRecord();

  // If there is no existing data, set `prevData` to an empty array.
  if (!prevData) {
    prevData = [];
  }

  // Concatenate `stockReservation` with `prevData`.
  prevData = [...prevData, stockReservation];

  // Convert `prevData` to a JSON string with 2-space indentation.
  const jsonData = JSON.stringify(prevData, null, 2);

  try {
    // Write the JSON data to the file at `filePath`.
    await fs.promises.writeFile(filePath, jsonData);
  } catch (error) {
    // Log any errors that occur while writing the file.
    console.log(error.message);
  }
};

const readStockReservationRecord = async () => {
  try {
    // read the file
    const jsonData = await fs.promises.readFile(filePath);
    // check if the file is empty
    if (jsonData.length === 0) {
      return [];
    }
    // parse the JSON data
    const data = await JSON.parse(jsonData);

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const removeRecordByIndex = (prevData, recordIndex) => {
  // Create a new array with all the elements except the one at the specified index.
  return prevData.filter((_, index) => index !== recordIndex);
};

const removeStockReservationRecord = async (recordIndex) => {
  // Read the existing stock reservation data.
  const prevData = await readStockReservationRecord();

  const newData = removeRecordByIndex(prevData, recordIndex);
  // Log the updated stockReservationRecord to console
  console.log("stockReservationRecord: ", newData);

  // Convert `newData` to a JSON string with 2-space indentation.
  const jsonData = JSON.stringify(newData, null, 2);

  try {
    // Write the JSON data to the file at `filePath`.
    await fs.promises.writeFile(filePath, jsonData);
  } catch (error) {
    // Log any errors that occur while writing the file.
    console.log(error.message);
  }
};

const updateStockDatabaseThenRemoveStockReservation = async (userId) => {
  // Read the existing stock reservation data.
  const stockReservationRecord = await readStockReservationRecord();

  // find id from record then subtract Qty --Basket Realtime Database

  // find userReservationRecord from  stockReservationRecord
  const index = stockReservationRecord.findIndex(
    (record) => record.userId === userId
  );
  //  userReservationRecord = {
  //   userId: userData.id,
  //   userBasketList: userBasketList,
  //   created: createdDate,
  // };

  if (index !== -1) {
    const { userBasketList } = stockReservationRecord[index];
    console.log(userBasketList);
    await subtractQuantityFromDatabase(userBasketList);
  }

  // now removefrom stockReservation
  await removeStockReservationRecord(stockReservationRecord, index);
};

// This function releases stock when a user disconnects from the socket, using the user's access token from their HTTP-only cookie
const releaseStockOnDisconnectWithAccessToken = async (socket) => {
  try {
    // Extract the value of the HTTP-only cookie
    const accessToken = socket.request.headers.cookie
      .split(";")
      .find((c) => c.trim().startsWith("userData"))
      .split("=")[1];

    // Call the releaseStockOnDisconnect function with the access token
    if (accessToken) {
      const respond = await releaseStockOnDisconnect(accessToken);
      console.log(respond);
    }

    // Stop watching the file for changes
    fs.unwatchFile(filePath);
  } catch (error) {
    console.error(`Error releasing stock on disconnect: ${error}`);
  }
};

export {
  updateStockReservationRecord,
  readStockReservationRecord,
  removeStockReservationRecord,
  releaseStockOnDisconnectWithAccessToken,
  updateStockDatabaseThenRemoveStockReservation,
};
