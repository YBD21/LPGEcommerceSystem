import { dataBase } from "../../firebaseConfig.js";
import fs from "fs";

const filePath = "BufferData/productList.json";

const sendProductList = async () => {
  let sendData = { Error: "" };
  const pathToUpdate = "ProductList/LPGasList";

  const refToUpdateProduct = dataBase.ref(pathToUpdate);

  try {
    await refToUpdateProduct.once("value", (snapshot) => {
      let data = snapshot.val();

      sendData = {
        ProductList: data,
      };
      updateProductListfile(sendData);
    });
  } catch (error) {
    sendData.Error = error.message;
  }
  return sendData;
};

const updateProductListfile = async (data) => {
  const jsonData = JSON.stringify(data);
  try {
    await fs.promises.writeFile(filePath, jsonData);
  } catch (error) {
    console.log(error.message);
  }
};

const readProductListfile = async () => {
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

const updateProductListQuantity = async (basket) => {
    
};

export { sendProductList, readProductListfile, updateProductListQuantity };
