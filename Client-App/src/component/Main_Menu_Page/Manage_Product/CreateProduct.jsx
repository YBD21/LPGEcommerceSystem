import React, { useState } from "react";
import axios from "axios";

function CreateProduct() {
  const [image, setImage] = useState(null);
  const [imageUrl,setImageUrl] = useState('');
  
  const [productName,setProductName] = useState('');
  const [qty,setQty] = useState(0);
  
  const [errorProductName,setErrorProductName] = useState('');
  const [errorOnQty,setErrorOnQty] = useState('');

  const checkName = () => {
    let count = 0;
    
    if (productName.length <=3 && productName.length !==0){
        // send an error message
    }

  };



  const handleChange = (e) => {
    let img = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setImage({
        img: img,
        data: reader.result,
      });
     setImageUrl(reader.result);
    };
    reader.readAsDataURL(img);
  };

  const uploadImage = () => {
    let data = {productName : productName, Qty : qty};
    let formData = new FormData();
    formData.append("img", image.img);
    formData.append("data",JSON.stringify(data));
    axios
      .post("http://localhost:5000/uploadData", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <div className="flex flex-col mx-2">
      <div className="flex flex-col my-5">
        <label className="block text-sm font-semibold text-gray-800">
          Product Image
        </label>
        
        {imageUrl && 
        <img src={imageUrl} className="ml-2 my-3 w-48 h-48 rounded-lg outline cursor-pointer" alt="Uploaded Image" />
        
        }
        <div className="">
          {/* only accept image */}
          <input
            type="file"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-5 py-2.5 tracking-wide 
      text-black font-medium text-s text-center"
          />
   
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-800">
          Product Name
        </label>
        <div className="relative flex flex-row cursor-pointer">
          <input
            type="text"
            placeholder="Enter Product Name"
            className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md 
            focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
            value = {productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-800">
          Quantity : In stock
        </label>
        <div className="relative flex flex-row cursor-pointer">
          <input
            type="number"
            placeholder="Enter Quantity"
            className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black
             focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
            value={qty}
            onChange={(e) => setQty(e.target.value)} 
          />
        </div>
      </div>
      
      <button
        className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s 
            text-center mr-3 mb-2"
        onClick={uploadImage}
      >
        Create Product
      </button>
    </div>
  );
}

export default CreateProduct;
