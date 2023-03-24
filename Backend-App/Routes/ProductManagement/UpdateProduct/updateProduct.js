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
  const jsonData = JSON.stringify(data, null, 2);

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

const subtractReservedQuantity = async (basketList) => {
  try {
    // Read product list from file
    const { ProductList: productList } = await readProductListfile();

    let updated = false; // flag to check if product stock was updated

    // Loop through basket items and update the product stock
    for (const basketItem of basketList) {
      const product = productList[basketItem.KeyName];

      // Check if product is in stock
      if (product.InStock < basketItem.Qty) {
        console.log(`${basketItem.ProductName} is out of stock.`);
        return { message: `${basketItem.ProductName} is out of stock.` };
      }

      // Subtract the quantity from the inventory
      product.InStock -= basketItem.Qty;
      // Set updated flag to true if product stock was updated
      updated = true;
    }

    // Update the productlist with the updated data only if product stock was updated
    if (updated) {
      // Prepare data for writing to file
      const updateData = {
        ProductList: productList,
      };

      // Update the productlist with the updated data
      await updateProductListfile(updateData);
    }

    return { message: "Stock reserved successfully", timer: 10 * 60 };
    // Return success message with timer 10 * 60  = 10 min
  } catch (error) {
    console.log(error.message);
  }
};

// Lock the user requested quantity for 10 minutes
// else throw--send error please update your cart

const addReservedQuantity = async (basketList) => {
  try {
    // Read product list from file
    const { ProductList: productList } = await readProductListfile();

    let updated = false; // flag to check if product stock was updated

    // Loop through basket items and add the reserved product stock back to inventory
    for (const basketItem of basketList) {
      const product = productList[basketItem.KeyName];

      // Add the quantity back to the inventory
      product.InStock += basketItem.Qty;

      // Set updated flag to true if product stock was updated
      updated = true;
      console.log(`${basketItem.ProductName} added back ${basketItem.Qty}`);
    }

    // Update the productlist with the updated data only if product stock was updated
    if (updated) {
      // Prepare data for writing to file
      const updateData = {
        ProductList: productList,
      };

      // Update the productlist with the updated data
      await updateProductListfile(updateData);
    }
    console.log("Stock added back to inventory successfully");

    // Return success message
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export {
  sendProductList,
  readProductListfile,
  subtractReservedQuantity,
  addReservedQuantity,
};
