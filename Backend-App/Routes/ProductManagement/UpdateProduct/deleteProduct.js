import { dataBase } from "../../firebaseConfig.js";
import { sendProductList } from "./updateProduct.js";

const deleteProductfromDatabase = async (KeyName) => {
  const pathToDeleteProduct = `ProductList/LPGasList/${KeyName}`;
  const refToDeleteProduct = dataBase.ref(pathToDeleteProduct);

  try {
    //delete the product from the database.
    await refToDeleteProduct.remove();
    console.log(`Product with key ${KeyName} deleted from database`);
    // update and send productList to client
    await sendProductList();
    return true;
  } catch (error) {
    console.error(`Error deleting product from database: ${error.message}`);
    return false;
  }
};

export { deleteProductfromDatabase };
