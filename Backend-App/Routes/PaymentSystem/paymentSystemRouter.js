import express from "express";
import { verifyTransaction, saveOrderDetail } from "./paymentOperation.js";
import { updateProductListQuantity } from "../ProductManagement/UpdateProduct/updateProduct.js";

const paymentSystemRouter = express.Router();
let StockReservationRecord = [];

paymentSystemRouter.post("/verify", async (req, res) => {
  const data = req.body;
  let respond;

  const verifyRespond = await verifyTransaction(data.tokenId, data.totalAmount);

  // if respond then upload these data into firestore database
  const orderData = await saveOrderDetail(data, verifyRespond);

  // copying OrderData into respond
  respond = orderData;

  res.json(respond);
});

paymentSystemRouter.post("/reserve-stock", async (req, res) => {
  const data = req.body;
  const basketData = data.Basket;
  const userData = data.UserInfo;
  // if UserInfo.id from the record then  else renew lock
  const respond = await updateProductListQuantity(basketData, userData);
});

paymentSystemRouter.delete("/release-stock", async (req, res) => {
  const data = req.body;
  const basketData = data.Basket;
  const userData = data.UserInfo;
  // release stock
});

export default paymentSystemRouter;
