import fs from "fs";
const filePath = "BufferData/stockReservationRecord.json";

const updateStockReservationRecord = async (stockReservation) => {
  let prevData = await readStockReservationRecord();
  prevData.push(stockReservation);
  if (!prevData) {
    prevData = [...stockReservation];
    const jsonData = JSON.stringify(prevData, null, 2);
    try {
      await fs.promises.writeFile(filePath, jsonData);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const readStockReservationRecord = async () => {
  try {
    // read the file
    const jsonData = await fs.promises.readFile(filePath);
    //Parse the JSON data

    const data = await JSON.parse(jsonData);

    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export { updateStockReservationRecord, readStockReservationRecord };
