import React, { useState, useEffect } from "react";
import SuccessMessageAdmin from "../Success_Message/SuccessMessageBox";
import ErrorTextMessageAdmin from "../Error_Handeling_Message/ErrorTextMessageAdmin";
import axios from "axios";
import ErrorMessageBoxAdmin from "../Error_Handeling_Message/ErrorMessageBoxAdmin";

function CreateLPGProduct() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [productName, setProductName] = useState("");
  const [qty, setQty] = useState(0);

  const [errorProductName, setErrorProductName] = useState({});
  const [errorOnQty, setErrorOnQty] = useState({});
  const [errorOnImage, setErrorOnImage] = useState({});
  const [errorMessageBox, setErrorMessageBox] = useState(null);

  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // erase error message whenever user is typing
    setErrorProductName({});
    setErrorOnQty({});
    setErrorOnImage({});
    setSuccess(null);
    setErrorMessageBox(null);
  }, [image, qty, productName]);

  //check image
  const checkImage = () => {
    let status = false;
    let testFormData = new FormData();

    try {
      testFormData.append("img", image.img);
    } catch (error) {
      status = true;
      setErrorOnImage({
        Image: true,
        Message: "Please Upload an Image.",
      });
    }

    return status;
  };

  //check Quantity
  const checkQuantity = () => {
    let status = false;

    if (qty < 0) {
      // number cannot be nagative
      setErrorOnQty({
        Qty: true,
        Message:
          "Please enter a valid quantity, it should be greater than zero.",
      });
      status = true;
    }
    return status;
  };

  //check Product Name
  const checkProductName = () => {
    let status = false;

    if (productName.length >= 0) {
      if (productName.length <= 3 || productName.length >= 70) {
        // send an error message
        setErrorProductName({
          ProductName: true,
          Message:
            "Please enter a product name that is between 3-70 characters long.",
        });
        status = true;
      }
    }
    return status;
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImage({
          img: e.target.files[0],
          data: reader.result,
        });
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const uploadImage = () => {
    let data = { productName: productName, Qty: qty };
    let formData = new FormData();

    formData.append("img", image.img);
    formData.append("data", JSON.stringify(data));

    axios
      .post("http://localhost:5000/uploadData", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.Message === true) {
          setSuccess("Success");
        } else {
          // set respond message here
          // console.log(response.data);
          setErrorProductName({
            ProductName: true,
            Message: response.data.productDataError,
          });
          setErrorOnImage({
            Image: true,
            Message: response.data.imageError,
          });
          setErrorMessageBox("Create Product Error");
        }
      })
      .catch((error) => {
        // console.log(error.message);
        setErrorMessageBox(error.message);
      });
  };

  const submitForm = () => {
    setErrorMessageBox(null);
    let statusImage = false;
    let statusName = false;
    let statusQty = false;

    statusImage = checkImage();
    statusName = checkProductName();
    statusQty = checkQuantity();

    if (statusImage === false && statusName === false && statusQty === false) {
      uploadImage();
    }
  };

  return (
    <div className="flex-1 flex-col mx-2">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8">Create LPG Product</h2>
      <div className="flex flex-col my-5">
        <label className="block text-sm font-semibold text-gray-800">
          Product Image
        </label>

        {imageUrl && (
          <img
            src={imageUrl}
            className="ml-2 my-3 w-32 h-58 rounded-lg outline cursor-pointer"
            alt="Uploaded"
          />
        )}
        <div
          className="w-full px-5 py-2.5 tracking-wide 
      text-black font-medium text-s"
        >
          {/* only accept image */}
          <input
            type="file"
            onChange={handleChange}
            accept="image/*"
            className="px-5 py-2.5"
          />
        </div>
        {/* Error Message For Image */}
        {errorOnImage.Image && (
          <ErrorTextMessageAdmin props={errorOnImage.Message} />
        )}
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
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        {/* Error Message For Product Name */}
        {errorProductName.ProductName && (
          <ErrorTextMessageAdmin props={errorProductName.Message} />
        )}
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
        {/* Error Message For Quantity */}
        {errorOnQty.Qty && <ErrorTextMessageAdmin props={errorOnQty.Message} />}
      </div>
      {/* Success Message */}
      {success && <SuccessMessageAdmin props={success} status={true} />}
      {/* Error Message */}
      {errorMessageBox && (
        <ErrorMessageBoxAdmin Error_message={errorMessageBox} status={true} />
      )}
      <button
        className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s 
            text-center mr-3"
        onClick={submitForm}
      >
        Create
      </button>
    </div>
  );
}

export default CreateLPGProduct;
