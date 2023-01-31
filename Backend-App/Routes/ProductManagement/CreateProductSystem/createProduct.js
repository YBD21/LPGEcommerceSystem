import { dataBase } from "../../firebaseConfig.js";
import {sendProductList} from "../UpdateProduct/updateProduct.js"
const CreateProduct = async (data, imageData) => {
  let createDate = new Date().toString();
  let sendData = { Message: "", Error: ""};

 const startCountRef = `ProductList/LPGasList/${data.productName.split(" ").join("")}`;
 
 const refToCreateProduct = dataBase.ref(startCountRef);

  await refToCreateProduct.update(
    ({
        ProductName:data.productName,
        ImageInfo: imageData,
        InStock: +data.Qty, // + convert string into number : the unary plus operator
        Created : createDate
    }),
    (error) => {
      if (error === null) {
         sendProductList();
        return (sendData = { ...sendData, Message: true });
      } else {
        return (sendData = { ...sendData, Error: error });
      }
    }
  );

  return sendData;
};

export { CreateProduct };
