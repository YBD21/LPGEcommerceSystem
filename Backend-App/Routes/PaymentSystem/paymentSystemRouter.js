import express from "express";
import { verifyTransaction, saveOrderDetail } from "./paymentOperation.js";
import {
  subtractReservedQuantity,
  addReservedQuantity,
} from "../ProductManagement/UpdateProduct/updateProduct.js";
import { decodeToken } from "../LoginSystem/login.js";
import {
  readStockReservationRecord,
  updateStockReservationRecord,
} from "./stockReservation.js";

const paymentSystemRouter = express.Router();

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

    if (respond?.timer) {
      const createdDate = new Date().toString(); // generate Data

      // Find the index of the user's record in stockReservationRecord
      const recordIndex = findRecordIndex(userData.id);

      if (recordIndex === -1) {
        // create record

        let stockReservationRecord = {
          userId: userData.id,
          userBasketList: userBasketList,
          created: createdDate,
        };

        await updateStockReservationRecord(stockReservationRecord);

        console.log("stockReservationRecord :", stockReservationRecord);
      }
    }

    res.json(respond);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error reserving stock" });
  }
});

paymentSystemRouter.patch("/release-stock", async (req, res) => {
  const { UserInfo: userData } = req.body;
  const releaseResult = await releaseStock(userData);

  if (releaseResult.error) {
    return res.status(404).json({ message: releaseResult.error });
  }

  return res.json({ message: releaseResult.message });
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

const findRecordIndex = async (userId) => {
  const stockReservationRecord = await readStockReservationRecord();
  return stockReservationRecord.findIndex((record) => record.userId === userId);
};

const releaseStock = async (userData) => {
  // Find the index of the user's record in stockReservationRecord
  const recordIndex = findRecordIndex(userData.id);

  // Return 404 error if user's record is not found
  if (recordIndex === -1) {
    return { error: "User record not found" };
  }
  const stockReservationRecord = await readStockReservationRecord();
  // Get the user's basket list from the stockReservationRecord
  const userBasketList = await stockReservationRecord[recordIndex]
    .userBasketList;

  //Release stock holding
  const canSubtractQuantity = await addReservedQuantity(userBasketList);

  // Return 400 error if quantity cannot be subtracted
  if (!canSubtractQuantity) {
    return { error: "Quantity cannot be subtracted" };
  }

  // Remove the user's record from the stockReservationRecord if quantity can be subtracted
  stockReservationRecord.splice(recordIndex, 1);

  // Log the updated stockReservationRecord to console
  console.log("stockReservationRecord: ", stockReservationRecord);

  // Return success message
  return { message: "Stock released successfully" };
};

const releaseStockOnDisconnect = async (token) => {
  const userData = decodeToken(token);
  // now release the stock if found user id found
  const respond = await releaseStock(userData?.id);
  return respond;
};

export { paymentSystemRouter, releaseStockOnDisconnect };
