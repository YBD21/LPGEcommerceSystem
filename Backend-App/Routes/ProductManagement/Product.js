import {Bucket} from "../firebaseConfig.js";

const product =  async() => {
    let sendData = {Data :"",Error : ""}; 
    const file = await Bucket.getFiles("Product_Images");
    console.log(file);
    
    return (
       sendData
    )
}

export {product}