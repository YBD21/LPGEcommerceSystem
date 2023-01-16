import { dataBase } from "../../firebaseConfig.js";

const CreateProduct = async (Data, imageData) => {
  let createDate = new Date().toString();
  let sendData = { Message: "", Error: "", Data : Data};
  /*
  let UploadData = {
    ProductName: Data.productName,
    ImageLink: imageUrl,
    ProductType: {
      New: {
        Qty: 10,
        Price: 4600,
      },
      Refill: {
        Qty: 10,
        Price: 1800,
      }
    }
  };
*/
let productName ="Sagar Gas" 
// str.split(" ").join("");
//   const startCountRef = `ProductList/${Data.productName}`;
 const startCountRef = `ProductList/${productName.split(" ").join("")}`;
 
 const refToCreateProduct = dataBase.ref(startCountRef);

  await refToCreateProduct.update(
    ({
        ProductName:"Sagar Gas",
        ImageInfo: imageData,
        ProductType: {
          New: {
            Qty: 10,
            Price: 4600,
          },
          Refill: {
            Qty: 10,
            Price: 1800,
          }
        },
        Created : createDate
    }),
    (error) => {
      if (error === null) {
        return (sendData = { ...sendData, Message: true });
      } else {
        return (sendData = { ...sendData, Error: error });
      }
    }
  );

  return sendData;
};

export { CreateProduct };
