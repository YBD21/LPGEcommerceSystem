import express from "express";
import { decodeToken } from "../LoginSystem/login.js";
import {
  cancelOrder,
  getAllOrderData,
  replenishCancelStockToDatabase,
} from "./orderOperation.js";

const orderManagementSystemRouter = express.Router();

orderManagementSystemRouter.patch("/cancel-order", async (req, res) => {
  // access who is user from http cookies
  const accessToken = req.cookies.userData;
  const { id: orderId } = req.body;
  const { id: userId } = await decodeToken(accessToken);
  // console.log(resondData?.id);
  // console.log(orderId);

  // send userId and orderId to find OrderList in firestore
  // get basketData from cancelOrder
  const cancelBasketData = await cancelOrder(userId, orderId);

  const respond = replenishCancelStockToDatabase(cancelBasketData);

  res.json(respond);
});

orderManagementSystemRouter.get("/get-all-order", async (req, res) => {
  const respond = await getAllOrderData();
  res.json(respond);
});

export default orderManagementSystemRouter;
