import express from "express";
import { verifyTransaction, saveOrderDetail } from "./paymentOperation.js";

const paymentSystemRouter = express.Router();

paymentSystemRouter.post("/verify", async (req, res) => {
  let data = req.body;
  //   console.log(data); // data.tokenId

  const verifyRespond = await verifyTransaction(data.tokenId, data.totalAmount);

  //   console.log(respond);
  // if respond then upload these data into firestore database
  const respond = await saveOrderDetail(data, verifyRespond);
  res.json(respond);
});

export default paymentSystemRouter;
