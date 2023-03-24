import express from "express";
import { verifyTransaction, saveOrderDetail } from "./paymentOperation.js";
import { reserveQuantity } from "../ProductManagement/UpdateProduct/updateProduct.js";

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

    // check if quantity can be reserved
    const respond = await reserveQuantity(userBasketList);

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
  const userData = req.body;
  // find user record
  const recordIndex = findRecordIndex(userData.id);

  stockReservationRecord.splice(recordIndex, 1);

  console.log("stockReservationRecord :", stockReservationRecord);
  res.json({ message: "Stock cancel successfully" });
});

export default paymentSystemRouter;
