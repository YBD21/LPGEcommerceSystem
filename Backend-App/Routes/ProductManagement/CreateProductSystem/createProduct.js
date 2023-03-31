import { dataBase } from "../../firebaseConfig.js";
import { sendProductList } from "../UpdateProduct/updateProduct.js";

const CreateProduct = async (data, imageData) => {
  let createDate = new Date().toString();
  let sendData = { Message: "", Error: "" };

  const startCountRef = `ProductList/LPGasList/${data.productName
    .split(" ")
    .join("")}`;
  const refToCreateProduct = dataBase.ref(startCountRef);

  try {
    // Update product information in database
    await refToCreateProduct.update({
      ProductName: data.productName,
      ImageInfo: imageData,
      InStock: +data.Qty, // + convert string into number : the unary plus operator
      Created: createDate,
    });
    // Send updated product list
    await sendProductList();
    // Set success message
    sendData = { ...sendData, Message: true };
  } catch (error) {
    // Set error message
    sendData = { ...sendData, Error: error };
  }

  return sendData;
};

export { CreateProduct };
