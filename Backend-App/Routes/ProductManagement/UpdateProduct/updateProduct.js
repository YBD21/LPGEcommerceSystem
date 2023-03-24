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

// userBasketList : [ { KeyName:"EverestGas" , ProductName: 'Everest Gas', Qty: 4 } ]

const reserveQuantity = async (basketList) => {
  try {
    // Read product list from file
    const { ProductList: productList } = await readProductListfile();

    // Loop through basket items and update the product stock
    for (const basketItem of basketList) {
      const product = productList[basketItem.KeyName];

      // Check if product is in stock
      if (product.InStock < basketItem.Qty) {
        console.log(`${basketItem.ProductName} is out of stock.`);
        return `${basketItem.ProductName} is out of stock.`;
      }

      // Subtract the quantity from the inventory
      product.InStock -= basketItem.Qty;
    }

    // Prepare data for writing to file
    const updateData = {
      ProductList: productList,
    };

    // Update the productlist with the updated data
    await updateProductListfile(updateData);

    // Lock the user requested quantity for 10 minutes

    // Return success message
    return "Stock reserved successfully";
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// and if possible lock user requested Qty for 10 Min.
// else throw--send error please update your cart

export { sendProductList, readProductListfile, reserveQuantity };
