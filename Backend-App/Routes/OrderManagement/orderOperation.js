import { fireStoreDB } from "../firebaseConfig.js";

const getOrderList = async (userId, orderId) => {
  let status = false;
  const unixTimeStamp = new Date().getTime();
  const countryCode = userId.substring(0, 3);
  const phoneNumber = userId.substring(3);

  const userCollectionRef = fireStoreDB
    .collection("Users")
    .doc(countryCode)
    .collection(phoneNumber)
    .doc(orderId);

  userCollectionRef
    .update({ status: "Cancel", cancel_at: unixTimeStamp })
    .then(() => {
      console.log("Status hasbeen updated to Cancel");
      status = true;
    })
    .catch((error) => {
      console.log("Error updating status: ", error.message);
    });

  return status;
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

export { getOrderList, checkUpdateOrderData };
