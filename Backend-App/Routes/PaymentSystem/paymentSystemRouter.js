import express from "express";
import { verifyTransaction, saveOrderDetail } from "./paymentOperation.js";
import {
  updateProductListQuantity,
  readProductListfile,
} from "../ProductManagement/UpdateProduct/updateProduct.js";

const paymentSystemRouter = express.Router();

const StockReservationRecord = [];

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
    const allProductData = await readProductListfile(); // ProductList
    const userBasketList = createBasketList(basketData); // users baskets
    console.log("userBasketList :", userBasketList);
    // check if user already exist
    const recordIndex = findRecordIndex(userData.id);

    const createdDate = new Date().toString(); // generate Data
    // if user doesnot exist createRecord else updateRecord
    if (recordIndex === -1) {
      // create record
      StockReservationRecord.push({
        userId: userData.id,
        userBasketList,
        created: createdDate,
      });
    } else {
      // update record
      StockReservationRecord[recordIndex].userBasketList = userBasketList;
      StockReservationRecord[recordIndex].created = createdDate;
    }
    console.log("StockReservationRecord :", StockReservationRecord);

    // await updateProductListQuantity(basketData, userData);

    res.json({ message: "Stock reserved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error reserving stock" });
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
      basketList.push({ ProductName, Qty });
    }
  });
  return basketList;
};

const findRecordIndex = (userId) => {
  return StockReservationRecord.findIndex((record) => record.userId === userId);
};

paymentSystemRouter.delete("/release-stock", async (req, res) => {
  const data = req.body;
  const basketData = data.Basket;
  const userData = data.UserInfo;
  // release stock
});

export default paymentSystemRouter;
