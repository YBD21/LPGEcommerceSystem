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
  // Convert the given date to a string in the format YYYYMMDDTHHmmss
  // by first converting it to ISO format, removing any "-" dashes or ":" colons, and
  // then slicing off the last 5 characters (which represent the milliseconds).
  // Convert date to string in the format of yyyyMMddHHmmss
  const formattedDate = date.toISOString().replace(/[-:]/g, "").slice(0, -5);

  // Generate a random string by first generating a random decimal number
  // between 0 and 1 using Math.random(), then converting it to base 36 (using
  // alphanumeric characters 0-9 and a-z), and finally extracting a substring
  // of length 6 starting at index 2 to remove the "0." prefix.
  // Generate a random string of 6 characters using the characters from 0-9 and a-z.
  const randomString = Math.random().toString(36).substring(2, 8);

  // Combine all parts to create unique ID
  const orderId = `${formattedDate}${phoneNumber}${randomString}`;

  return orderId;
};

const saveOrderDetail = async (payloadData, confirmationData) => {
  let sendData;

  const timestamp = confirmationData?.created_on;
  const date = new Date(timestamp);

  // console.log(date.getTime())
  const unixTimeStamp = date.getTime();

  // change status here
  const newOrder = {
    token: payloadData?.tokenId,
    basket: payloadData?.items,
    amount: payloadData?.totalAmount,
    created: unixTimeStamp,
    gasRate: payloadData?.gasRate,
    deliveryRate: payloadData?.deliveryRate,
    status: "Not Delivered",
    idx: confirmationData?.idx,
    PaymentType: "E-Pay",
    deliveryInfo: payloadData?.deliveryInfo,
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

    sendData = { orderId: orderId }; // add min max delivery Time here
  } catch (error) {
    console.error("Error adding order to Firestore: ", error);
  }
  return sendData;
};

const updateTotalOrderCount = async () => {
  const orderRef = fireStoreDB
    .collection("TotalOrder")
    .doc("xRKlU7DnVf4XrrzxNpLm");

  await fireStoreDB.runTransaction(async (transaction) => {
    const orderDoc = await transaction.get(orderRef);

    if (!orderDoc.exists) {
      throw new Error("TotalOrder document does not exist");
    }

    const orderCount = orderDoc.data().orderCount;

    transaction.update(orderRef, { orderCount: orderCount + 1 });
  });
};

const saveOrderDetailForCashOnDelivery = async (payloadData) => {
  let sendData;

  const date = new Date();
  const unixTimeStamp = date.getTime();
  // change status here
  const newOrder = {
    basket: payloadData?.items,
    amount: payloadData?.totalAmount,
    created: unixTimeStamp,
    gasRate: payloadData?.gasRate,
    deliveryRate: payloadData?.deliveryRate,
    status: "Not Delivered",
    PaymentType: "Cash On Delivery",
    deliveryInfo: payloadData?.deliveryInfo,
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
    sendData = { orderId: orderId }; // add min max delivery Time here
  } catch (error) {
    console.error("Error adding order to Firestore: ", error);
  }
  return sendData;
};

const checkReservationTimeValidity = () => {
  // Check if the request to reserve stock was made between 6 PM and 6 AM Nepal time. If so, block the user.
  const unixTimeStampNow = new Date().getTime();

  const requestHour = new Date(unixTimeStampNow).getUTCHours() + 5.75; // Add 5 hours and 45 minutes for Nepal time
  console.log("Requested Hour : ", requestHour);
  if (requestHour >= 22 || requestHour < 6) {
    //(requestHour >= 18 || requestHour < 6)
    // Request made between 6 PM and 6 AM Nepal time, block user
    console.log(" Request made between 6 PM and 6 AM Nepal time, block user");
    return false;
  } else {
    // Request made between 6 AM and 6 PM Nepal time, allow reservation
    console.log(" Request made between 6 AM and 6 PM Nepal time, allow reservation");
    return true;
  }
};

export {
  verifyTransaction,
  saveOrderDetail,
  saveOrderDetailForCashOnDelivery,
  checkReservationTimeValidity,
  updateTotalOrderCount,
};
