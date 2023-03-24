import express from "express";
import { verifyTransaction, saveOrderDetail } from "./paymentOperation.js";
import {
  subtractReservedQuantity,
  addReservedQuantity,
} from "../ProductManagement/UpdateProduct/updateProduct.js";

const paymentSystemRouter = express.Router();

const stockReservationRecord = [];

paymentSystemRouter.post("/verify", async (req, res) => {
  try {
    const { tokenId, totalAmount } = req.body;
    const verifyResponse = await verifyTransaction(tokenId, totalAmount);
    const orderData = await saveOrderDetail(req.body, verifyResponse);
    res.json(orderData);
  } catch (error) {
    res.status(500).json({ message: "Error verifying transaction" });
  }
});

paymentSystemRouter.post("/reserve-stock", async (req, res) => {
  try {
    const { Basket: basketData, UserInfo: userData } = req.body;

    const userBasketList = createBasketList(basketData); // users baskets

    console.log("userBasketList :", userBasketList);

    // check if quantity can be subtracted
    const respond = await subtractReservedQuantity(userBasketList);

    const createdDate = new Date().toString(); // generate Data

    // create record
    stockReservationRecord.push({
      userId: userData.id,
      userBasketList: userBasketList,
      created: createdDate,
    });

    console.log("stockReservationRecord :", stockReservationRecord);

    res.json(respond);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error reserving stock" });
  }
  // if UserInfo.id from the record then  else renew lock
  // const respond = await updateProductListQuantity(basketData, userData);
});

const createBasketList = (basketData) => {
  const basketList = [];
  basketData.forEach(({ ProductName, Qty }) => {
    const existingItem = basketList.find(
      (item) => item.ProductName === ProductName
    );
    if (existingItem) {
      existingItem.Qty += Qty;
    } else {
      let KeyName = ProductName.replace(/\s/g, ""); // remove all space
      basketList.push({ KeyName, ProductName, Qty });
    }
  });
  return basketList;
};

const findRecordIndex = (userId) => {
  return stockReservationRecord.findIndex((record) => record.userId === userId);
};

paymentSystemRouter.delete("/release-stock", async (req, res) => {
  const { id } = req.body;

  // Find the index of the user's record in stockReservationRecord
  const recordIndex = findRecordIndex(id);

  // Return 404 error if user's record is not found
  if (recordIndex === -1) {
    return res.status(404).json({ message: "User record not found" });
  }

  // Get the user's basket list from the stockReservationRecord
  const userBasketList = stockReservationRecord[recordIndex].userBasketList;

  // Check if the quantity can be subtracted from the reserved stock
  const canSubtractQuantity = await subtractReservedQuantity(userBasketList);

  // Return 400 error if quantity cannot be subtracted
  if (!canSubtractQuantity) {
    return res.status(400).json({ message: "Quantity cannot be subtracted" });
  }

  // Remove the user's record from the stockReservationRecord if quantity can be subtracted
  stockReservationRecord.splice(recordIndex, 1);

  // Log the updated stockReservationRecord to console
  console.log("stockReservationRecord: ", stockReservationRecord);

  // Return success message
  return res.json({ message: "Stock released successfully" });
});

export default paymentSystemRouter;
