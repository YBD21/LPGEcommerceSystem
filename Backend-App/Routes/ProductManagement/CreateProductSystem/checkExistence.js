import {dataBase,Bucket} from "../../firebaseConfig.js";

const CheckExistenceOfImage = async (requestedDataFile) => {
    let sendData = {};

    let imageFile = Bucket.file(
        `Product_Images/${requestedDataFile.originalname}`
        );
    const imageExists = await imageFile.exists();
    
    if (imageExists[0]) {
        // console.log("exist");
        sendData = {imageError : `File ${requestedDataFile.originalname} already exists`};
    }  
    return sendData;
};

const CheckExistenceOfProductData = async (Data) => {
    let sendData = {};
    let productName ="Sagar Gas";
    const startCountRef = `ProductList/${productName.split(" ").join("")}`;
    const refToCheckProductExist = dataBase.ref(startCountRef);
    await refToCheckProductExist.once("value", (snapshot) => {
        // console.log(snapshot.val());
        // check if same product name is in database
        if(snapshot.exists()){
         
          return (
            sendData = {
              productDataError : `${productName} already exist !`
            }
          )
        } 
    });
    return sendData;
};

export {CheckExistenceOfImage,CheckExistenceOfProductData};
