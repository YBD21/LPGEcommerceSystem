import express from "express";
import Multer from "multer";
import { updateDeliveryRate } from "./UpdateRate/updateDeliveryRate.js";
import { updateGasRate } from "./UpdateRate/updateGasRate.js";
import {
  CheckExistenceOfImage,
  CheckExistenceOfProductData,
} from "./CreateProductSystem/checkExistence.js";
import { CreateProduct } from "./CreateProductSystem/createProduct.js";
import { ImageUpload } from "./CreateProductSystem/imageUpload.js";
import { updateProductStock } from "./UpdateProduct/updateProduct.js";
import { deleteProductfromDatabase } from "./UpdateProduct/deleteProduct.js";

// used for uploading files
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

const productManagementSystemRouter = express.Router();

productManagementSystemRouter.post("/updateDeiveryRate", async (req, res) => {
  let data = req.body;
  const respond = await updateDeliveryRate(data.RefillRate, data.NewGasRate);
  res.json(respond);
});

productManagementSystemRouter.post("/updateGasRate", async (req, res) => {
  let data = req.body;
  const respond = await updateGasRate(data.RefillRate, data.NewGasRate);
  res.json(respond);
});

productManagementSystemRouter.post(
  "/uploadData",
  multer.single("img"),
  async (req, res) => {
    let data = JSON.parse(req.body.data);
    // console.log(data);
    const imageStatus = await CheckExistenceOfImage(req.file);
    const productDataStatus = await CheckExistenceOfProductData(data);

    if (!imageStatus.imageError && !productDataStatus.productDataError) {
      const getUrl = await ImageUpload(req.file);
      const respond = await CreateProduct(data, getUrl);
      return res.json(respond);
    }
    // imageExist but productData is not
    if (imageStatus.imageError && !productDataStatus.productDataError) {
      // get the image name and url
      const getUrl = await ImageUpload(req.file);
      // create product
      const respond = await CreateProduct(data, getUrl);
      return res.json(respond);
    }

    let error = { ...imageStatus, ...productDataStatus };
    return res.json(error);
  }
);

productManagementSystemRouter.patch("/updateStock", async (req, res) => {
  const { keyName: KeyName, stock: newStock } = req.body;
  const respond = await updateProductStock(KeyName, newStock);
  res.json(respond);
});

productManagementSystemRouter.delete("/delete-product", async (req, res) => {
  const { keyName: KeyName } = req.query;
  const respond = await deleteProductfromDatabase(KeyName);
  res.json(respond);
});

export default productManagementSystemRouter;
