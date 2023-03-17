import axios from "axios";
import { fireStoreDB } from "../firebaseConfig.js";
import * as dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.KHALTI_SECRET_KEY;

const verifyTransaction = async (tokenId, totalAmount) => {
  let sendData;
  // for test mode max allowed  Rs.200  replace with totalAmount
  const data = {
    token: tokenId,
    amount: 200 * 100, // 100 --> paisa
  };

  const config = {
    headers: { Authorization: `Key ${secretKey}` },
  };

  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      data,
      config
    );
    // console.log(response.data);
    sendData = response.data;
  } catch (error) {
    console.log(error);
  }

  return sendData;
};

const generateOrderId = (date, phoneNumber) => {
  // Convert date to string in the format of yyyyMMddHHmmss
  const formattedDate = date.toISOString().replace(/[-:]/g, "").slice(0, -5);

  // Generate a random string of 6 characters using the characters from 0-9 and a-z.
  const randomString = Math.random().toString(36).substr(2, 6);

  // Combine all parts to create unique ID
  const orderId = `${formattedDate}${phoneNumber}${randomString}`;

  return orderId;
};

const saveOrderDetail = async (payloadData, confirmationData) => {
  let sendData;

  const timestamp = confirmationData?.created_on;
  const date = new Date(timestamp);

  const newOrder = {
    token: payloadData?.tokenId,
    basket: payloadData?.items,
    amount: payloadData?.totalAmount,
    created: date.toString(),
    gasRate: payloadData?.gasRate,
    deliveryRate: payloadData?.deliveryRate,
    status: "Not Delivered",
    idx: confirmationData?.idx,
  };

  const countryCode = payloadData?.phoneNumber.substring(0, 3);
  const phoneNumber = payloadData?.phoneNumber.substring(3);

  const orderId = generateOrderId(date, phoneNumber);

  const userRef = fireStoreDB
    .collection("Users")
    .doc(countryCode)
    .collection(phoneNumber)
    .doc(orderId);

  try {
    await userRef.set(newOrder);
    console.log("Order successfully added to Firestore!");
    sendData = { orderId: orderId };
  } catch (error) {
    console.error("Error adding order to Firestore: ", error);
  }
  return sendData;
};

export { verifyTransaction, saveOrderDetail };
