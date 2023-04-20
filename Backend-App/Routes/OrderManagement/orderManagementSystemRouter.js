import express from "express";
import {
  decodeToken,
  verifyTokenAndDecodeToken,
} from "../LoginSystem/login.js";
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
  // access who is user from http cookies
  const accessToken = req.cookies.userData;
  const decodeToken = await verifyTokenAndDecodeToken(accessToken);

  if (!decodeToken.error && decodeToken.role === "Admin") {
    console.log(
      `User ID : ${decodeToken.id} with Role of : ${decodeToken.role} is Accessing getAllOrder !`
    );

    const respond = await getAllOrderData();
    res.json(respond);
  }

  res.json(decodeToken.error);
});

export default orderManagementSystemRouter;
