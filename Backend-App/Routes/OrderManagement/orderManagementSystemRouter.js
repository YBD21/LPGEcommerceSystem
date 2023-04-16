import express from "express";
import { decodeToken } from "../LoginSystem/login.js";
import { getOrderList } from "./orderOperation.js";

const orderManagementSystemRouter = express.Router();

orderManagementSystemRouter.patch("/cancel-order", async (req, res) => {
  // access who is user from http cookies
  const accessToken = req.cookies.userData;
  const { id: orderId } = req.body;
  const resondData = await decodeToken(accessToken);

  // send accessToken to find OrderList in firestore
  const respondOrderData = await getOrderList(resondData?.id, orderId);
  res.json(respondOrderData);
  // console.log(resondData?.id);
  // console.log(orderId);
});

export default orderManagementSystemRouter;
