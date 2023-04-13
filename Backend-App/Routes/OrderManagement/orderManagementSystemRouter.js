import express from "express";
import { verifyTokenAndDecodeToken } from "../LoginSystem/login.js";
import { getOrderList } from "./orderOperation.js";

const orderManagementSystemRouter = express.Router();

orderManagementSystemRouter.get("/order-data", async (req, res) => {
  // access who is user from http cookies
  const accessToken = req.cookies.userData;
  const resondData = verifyTokenAndDecodeToken(accessToken);
  if (resondData.error) {
    res.status(400).json({ error: resondData.error });
  } else {
    // send accessToken to find OrderList in firestore
    const respondOrderData = await getOrderList(resondData?.id);
    res.json(respondOrderData);
  }
});

export default orderManagementSystemRouter;
