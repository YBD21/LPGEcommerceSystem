import {dataBase,Bucket} from "../../firebaseConfig.js";

const CheckExistenceOfImage = async (requestedDataFile) => {
    let sendData = {};

    let imageFile = Bucket.file(
        `Product_Images/${requestedDataFile.originalname}`
        );
    const imageExists = await imageFile.exists();
    
    if (imageExists[0]) {
        // console.log("exist");
        sendData = {imageError : `Image : ${requestedDataFile.originalname} already exists !`};
    }  
    return sendData;
};

const CheckExistenceOfProductData = async (data) => {
    let sendData = {};
    const startCountRef = `ProductList/LPGasList/${data.productName.split(" ").join("")}`;
    const refToCheckProductExist = dataBase.ref(startCountRef);
    await refToCheckProductExist.once("value", (snapshot) => {
        // check if same product name is in database
        if(snapshot.exists()){
          return (
            sendData = {
              productDataError : `ProductName : ${data.productName} already exist !`
            }
          )
        } 
    });
    return sendData;
};

export {CheckExistenceOfImage,CheckExistenceOfProductData};
