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

const canReserveQuantity = async (basketList) => {
  let sendData = false;
  try {
    // Read product list from file
    const { ProductList: productList } = await readProductListfile();

    // Map through basket items and get product name and in stock quantity
    const productToUpdate = basketList.map((basket) => {
      const { ProductName, InStock } = productList[basket.KeyName];
      return { ProductName, InStock };
    });

    // Update product list by subtracting basket quantity from product in stock quantity
    productToUpdate.forEach(({ ProductName }) => {
      // Find the corresponding item in the basket list based on the product name
      const basketItem = basketList.find(
        (item) => item.ProductName === ProductName
      );

      // Get the product information from the product list using the key name
      const product = productList[basketItem.KeyName];

      // If the product is still in stock, subtract the quantity from the inventory
      if (product.InStock <= 0) {
        return sendData;
      }
      product.InStock -= basketItem.Qty;
    });

    // Log the updated product list and the products that need to be updated
    // console.log(productList);
    console.log(productToUpdate);

    // Prepare data for writing to file
    const updateData = {
      ProductList: productList,
    };

    // Update the productlist with the updated data
    updateProductListfile(updateData);
  } catch (error) {
    console.log(error.message);
  }

  // and if possible lock user requested Qty for 10 Min.
  // else throw--send error please update your cart

  return sendData;
};

export { sendProductList, readProductListfile, canReserveQuantity };
