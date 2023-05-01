import { dataBase, fireStoreDB } from "./firebaseConfig.js";

const getDashBoardData = async () => {
  // Total order Count
  const orderTotalCount = await getTotalOrderCount();
  // Total user Count
  const userTotalCount = await getTotalUserCount();
  return { orderTotalCount, userTotalCount };
};

const getTotalOrderCount = async () => {
  const orderRef = fireStoreDB
    .collection("TotalOrder")
    .doc("xRKlU7DnVf4XrrzxNpLm");

  const orderDoc = await orderRef.get();

  if (!orderDoc.exists) {
    throw new Error("TotalOrder document does not exist");
  }

  const orderCount = orderDoc.data().orderCount;

  return orderCount;
};

const getTotalUserCount = async () => {
  const startCountRef = "SignInWithPhoneNumber/TotalUser";
  const ref = dataBase.ref(startCountRef);

  const snapshot = await ref.once("value");

  const userCount = snapshot.val();

  return userCount;
};

export { getDashBoardData };
