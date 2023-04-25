import express from "express";
import {
  decodeToken,
  verifyTokenAndDecodeToken,
} from "../LoginSystem/login.js";
import {
  cancelOrder,
  editOrder,
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

orderManagementSystemRouter.patch("/edit-order", async (req, res) => {
  try {
    // access who is user from http cookies
    const accessToken = req.cookies.userData;
    const {
      orderId: orderId,
      deliveryStatus: deliveryStatus,
      deliveredBy: deliveredBy,
      id: userId,
    } = req.body;
    const { id: accessId, role: accessRole } = await decodeToken(accessToken);
    console.log(
      `User ID : ${accessId} with Role of : ${accessRole} is Accessing edit-order !`
    );
    if (accessRole === "Admin") {
      if (deliveryStatus === "Cancel") {
        // send userId and orderId to find OrderList in firestore
        // get basketData from cancelOrder
        const cancelBasketData = await cancelOrder(userId, orderId);

        const respond = replenishCancelStockToDatabase(cancelBasketData);

        res.json(respond);
      } else {
        const respond = editOrder(userId, orderId, deliveredBy, deliveryStatus);
        res.json(respond);
      }
    } else {
      res.status(400).send("Unauthorized Access");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default orderManagementSystemRouter;
