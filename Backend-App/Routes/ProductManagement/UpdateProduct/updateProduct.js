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

// {
//   Basket: [
//     {
//       id: 0,
//       itemId: 100,
//       Image: 'https://storage.googleapis.com/final-year-project-b1ff7.appspot.com/Product_Images/Baba%20Gas.png?GoogleAccessId=firebase-adminsdk-8wzet%40final-year-project-b1ff7.iam.gserviceaccount.com&Expires=16730302500&Signature=VnAnP2GWpzWALblm0JF2vxjCuAlVg%2FyHC%2BKG33D18ouk0KqCgpk3UORtT1K8Jh64LOaH1gQWFM0wUdffyJ5hssj%2F3eF4Kn68KENcSxbBUFD2qeW0y64USr9EsK8WTGD38LLk53zAG8Xo5cOnE5%2FiJWDnqiAjRTg81nv6J%2F334LHORMDOKPfcFAYHJjNdENq2V5zyvD2V3%2FafFpU5yPpplPfQmi2quUt5DbtYIMQsqg89sD7kS4aUmK3ZVrjFYsRHgVEo47Jik5qqqz8mE39dpef2Pif0MZpuYkISIPuJjsCxYmy6PZkYD%2BO61c46WJdMpcDZnDlO9mbgRU7eHek4ww%3D%3D',
//       ProductName: 'Baba Gas',
//       ProductType: 'Refill',
//       Qty: 3
//     }
//   ],
//   UserInfo: {
//     firstName: 'Santosh',
//     lastName: 'Deuja',
//     role: 'Admin',
//     id: '9779860694050',
//     iat: 1679405064,
//     exp: 1679408664
//   }
// }

const updateProductListQuantity = async (basket, userData) => {
  console.log(userData);

  // To check for avilablity of stock -- backend
  // and if possible lock user requested Qty for 10 Min. -- backend
  // else throw--send error please update your cart -- backend
};

export { sendProductList, readProductListfile, updateProductListQuantity };
