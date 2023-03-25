import fs from "fs";
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

const removeStockReservationRecord = async (recordIndex) => {
  // Read the existing stock reservation data.
  const prevData = await readStockReservationRecord();

  // Create a new array with all the elements except the one at the specified index.
  const newData = prevData.filter((_, index) => index !== recordIndex);
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

export {
  updateStockReservationRecord,
  readStockReservationRecord,
  removeStockReservationRecord,
};
