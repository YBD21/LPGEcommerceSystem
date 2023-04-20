import { createBasketList } from "../PaymentSystem/paymentSystemRouter.js";
import { addBasketListQuantityToDatabase } from "../ProductManagement/UpdateProduct/updateProduct.js";
import { fireStoreDB, dataBase } from "../firebaseConfig.js";

const cancelOrder = async (userId, orderId) => {
  const unixTimeStamp = new Date().getTime();
  const countryCode = userId.substring(0, 3);
  const phoneNumber = userId.substring(3);

  const userCollectionRef = fireStoreDB
    .collection("Users")
    .doc(countryCode)
    .collection(phoneNumber)
    .doc(orderId);

  // Get a snapshot of the order details
  const orderListSnapshot = await userCollectionRef.get();
  // Extract the Orderlist from the snapshot
  const orderData = orderListSnapshot.data();
  // Extract the basket from the data
  const basketList = orderData.basket;

  await userCollectionRef
    .update({ status: "Cancel", cancel_at: unixTimeStamp })
    .then(() => {
      console.log("Status updated to Cancel");
    })
    .catch((error) => {
      console.log("Error updating status: ", error.message);
    });

  return basketList;
};

const getAllOrderData = async () => {
  const usersRef = fireStoreDB.collection("Users");

  // array of countryCode
  const countryCodes = await getAllCountryCode(usersRef);
  console.log("Country Codes :", countryCodes);

  // array of phoneNumber
  const phoneNumbers = await getAllPhoneNumber(usersRef, countryCodes);
  console.log("PhoneNumber List :", phoneNumbers);

  // array of OrderId
  const orderIdList = await getAllOrderId(usersRef, phoneNumbers);
  // console.log("OrderIdList :", orderIdList);

  //  add costumer name into OrderList
  const orderListWithCustomerName = await addCustomerName(orderIdList);
  console.log("OrderIdList :", orderListWithCustomerName);

  return orderListWithCustomerName;
};

const getAllCountryCode = async (usersRef) => {
  const countryCodeList = []; // 977
  await usersRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        countryCodeList.push(doc.id);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  // console.log("Country Code :", countryCodeList);
  return countryCodeList;
};

const getAllPhoneNumber = async (usersRef, countryCodes) => {
  let phoneNumber = {}; // 9860694050
  await Promise.all(
    countryCodes.map((countryIndex) => {
      phoneNumber[countryIndex] = {};
      return usersRef
        .doc(countryIndex)
        .listCollections()
        .then((subcollections) => {
          subcollections.forEach((subcollection) => {
            // phoneNumber.push(subcollection.id);
            phoneNumber[countryIndex][subcollection.id] = {};
          });
        })
        .catch((error) => {
          console.log("Error getting subcollections: ", error);
        });
    })
  );
  return phoneNumber;
};

const getAllOrderId = async (usersRef, phoneNumbers) => {
  let orderIds = {}; //20230412T1446129860694050vbpf08

  const dateTimeNow = new Date().getTime();

  await Promise.all(
    Object.keys(phoneNumbers).map((countryIndex) => {
      orderIds[countryIndex] = {};
      return Promise.all(
        Object.keys(phoneNumbers[countryIndex]).map((phoneNumber) => {
          orderIds[countryIndex][phoneNumber] = {};
          return new Promise((resolve, reject) => {
            usersRef
              .doc(countryIndex)
              .collection(phoneNumber)
              .orderBy("created", "desc")
              .where("created", "<", dateTimeNow)
              .limit(5)
              .onSnapshot((querySnapshot) => {
                const data = {};
                querySnapshot.forEach((doc) => {
                  data[doc.id] = doc.data();
                });
                orderIds[countryIndex][phoneNumber] = data;
                resolve();
              }, reject);
          });
        })
      );
    })
  );

  return orderIds;
};

const addCustomerName = async (orderList) => {
  // get CustomerName and attach into orderList

  let orderListWithCustomerName = { ...orderList }; // copy OrderList

  let startCountRef;

  let refDatabase;

  await Promise.all(
    Object.keys(orderList).map((countryCodeIndex) => {
      return Promise.all(
        Object.keys(orderList[countryCodeIndex]).map(async (phoneNumber) => {
          startCountRef = `SignInWithPhoneNumber/+${countryCodeIndex}/${phoneNumber}`;
          refDatabase = dataBase.ref(startCountRef);
          await refDatabase.once("value", (snapshot) => {
            let firstName = snapshot.val().FirstName;
            let lastName = snapshot.val().LastName;
            orderListWithCustomerName[countryCodeIndex][phoneNumber] = {
              ...orderListWithCustomerName[countryCodeIndex][phoneNumber],
              FirstName: firstName,
              LastName: lastName,
            };
          });
        })
      );
    })
  );

  return orderListWithCustomerName;
};

const checkUpdateOrderData = async (
  userId,
  orderBy,
  dataTime,
  comparisonOperator
) => {
  const countryCode = userId.substring(0, 3);
  const phoneNumber = userId.substring(3);

  let documents = {};
  // let isUpdate = true;
  const fieldNameToFilterBy = "created";

  const sortDateBy = (state) => {
    switch (state) {
      case "Latest Date":
        return "desc";

      case "Oldest Date":
        return "asc";

      default:
        return "desc";
    }
  };

  const getTimeStamp = (unixTimeStamp) => {
    return unixTimeStamp === 0 ? new Date().getTime() : unixTimeStamp;
  };

  const startingTimeStamp = getTimeStamp(dataTime);

  const sortBy = sortDateBy(orderBy);

  const userCollectionRef = fireStoreDB
    .collection("Users")
    .doc(countryCode)
    .collection(phoneNumber)
    .orderBy(fieldNameToFilterBy, sortBy)
    .where(fieldNameToFilterBy, comparisonOperator, startingTimeStamp)
    .limit(5);

  console.log(
    `Retrieving documents from collection 'Users/${countryCode}/${phoneNumber}'...`
  );

  return new Promise((resolve, reject) => {
    userCollectionRef.onSnapshot(
      (querySnapshot) => {
        // querySnapshot.docChanges().forEach((change) => {
        //   if (change.type === "modified") {
        //     isUpdate = true;
        //   }
        //   if (change.type === "removed") {
        //     isUpdate = true;
        //   }
        // });

        console.log(`Retrieved ${querySnapshot.docs.length} documents.`);
        // if (isUpdate) {
        // }
        documents = querySnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});

        console.log(`Documents:`, documents);

        // console.log(startingTimeStamp);
        // const documentsSizeInBytes = new TextEncoder().encode(
        //   JSON.stringify(documents)
        // ).length;
        // const documentsSizeInKB = documentsSizeInBytes / 1024;
        // console.log(`Documents size: ${documentsSizeInKB} KB`);
        const sendData = { OrderData: documents };
        resolve(sendData);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const replenishCancelStockToDatabase = async (basket) => {
  // filterBasketList
  const filteredBasketData = createBasketList(basket);
  // update Stock
  const respond = await addBasketListQuantityToDatabase(filteredBasketData);

  return respond;
};

export {
  cancelOrder,
  checkUpdateOrderData,
  replenishCancelStockToDatabase,
  getAllOrderData,
};
