import express from "express";
import { verifyTransaction, saveOrderDetail } from "./paymentOperation.js";
import { updateProductListQuantity } from "../ProductManagement/UpdateProduct/updateProduct.js";
const paymentSystemRouter = express.Router();

paymentSystemRouter.post("/verify", async (req, res) => {
  let data = req.body;
  let respond;

  const verifyRespond = await verifyTransaction(data.tokenId, data.totalAmount);

  // if respond then upload these data into firestore database
  const orderData = await saveOrderDetail(data, verifyRespond);

  // copying OrderData into respond
  respond = orderData;
   
  // const res = await updateProductListQuantity(respond.basket); 
  
  res.json(respond);
});

export default paymentSystemRouter;
