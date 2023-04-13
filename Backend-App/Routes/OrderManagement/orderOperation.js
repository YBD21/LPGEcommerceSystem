import { fireStoreDB } from "../firebaseConfig.js";

const getOrderList = async (userId) => {
  const countryCode = userId.substring(0, 3);
  const phoneNumber = userId.substring(3);

  const userCollectionRef = fireStoreDB
    .collection("Users")
    .doc(countryCode)
    .collection(phoneNumber);

  console.log(
    `Retrieving documents from collection 'Users/${countryCode}/${phoneNumber}'...`
  );
  const querySnapshot = await userCollectionRef
    .orderBy("created", "asc")
    .limit(5)
    .get();

  console.log(`Retrieved ${querySnapshot.docs.length} documents.`);

  const documents = querySnapshot.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data();
    return acc;
  }, {});

  console.log(`Documents:`, documents);

  const documentsSizeInBytes = new TextEncoder().encode(
    JSON.stringify(documents)
  ).length;
  const documentsSizeInKB = documentsSizeInBytes / 1024;
  console.log(`Documents size: ${documentsSizeInKB} KB`);

  const sendData = { OrderData: documents };
  return sendData;
};

export { getOrderList };
