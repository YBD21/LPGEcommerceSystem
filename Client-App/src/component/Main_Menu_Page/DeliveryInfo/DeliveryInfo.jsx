import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateValue } from "../../../ContextAPI/StateProvider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { provincesOfNepal, districtsByProvince } from "../NepalLocationData";
import ErrorMessageDeliveryInfo from "./ErrorMessageDeliveryInfo";

const DeliveryInfo = () => {
  const [currentstate, setCurrentState] = useState("");
  const [currentDistrict, setCurrentDistrict] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [errorcity, setErrorCity] = useState({});
  const [erroraddress, setErrorAddress] = useState({});
  // import userData from contexProvider or dataLayer
  const [{ userData, payStatus, basket }, dispatch] = useStateValue();

  const phoneNumber = parseInt(userData?.id.slice(3));

  const name = userData?.firstName + " " + userData?.lastName;

  const selectLogProvince = (e) => {
    setCurrentState(e.target.value);
  };

  const selectLogDistrictsByProvince = (e) => {
    setCurrentDistrict(e.target.value);
  };

  const requestToReserveStock = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/payment-system/reserve-stock",
        {
          Basket: basket,
          UserInfo: userData,
        }
      );
      // console.log(response);
      return response?.data?.timer ? response?.data?.timer : 0;
    } catch (error) {
      console.log(error.message);
      return 0;
    }
  };

  const processPayment = async () => {
    // onClick pay send request to backend
    const timer = await requestToReserveStock();
    // onsucess of reserved getPaymentPortal
    openPotal(timer);
  };

  const openPotal = (timer) => {
    dispatch({
      type: "SET_SHOW_POPUP",
      showPopup: { show: "payment", timer: timer },
    });
  };

  const checkFields = () => {
    const isValidDeliveryAddress = checkDeliveryAddress();
    const isValidCity = checkCity();
    if (isValidCity && isValidDeliveryAddress) {
      return true;
    }
    return false;
  };

  const checkDeliveryAddress = () => {
    const maxLength = 250; // Maximum allowed length for the address
    let message = ""; // Initialize error message to an empty string
    let valid = true; // Set valid to true by default

    // Check if the address is empty
    if (address.trim().length === 0) {
      message = "Address is required !"; // Set the error message
      valid = false; // Set valid to false
    } else if (address.length > maxLength) {
      // Check if the address is too long
      message = `Address must be up to ${maxLength} characters !`; // Set the error message
      valid = false; // Set valid to false
    }

    // Update the address state with the valid and message values
    setErrorAddress({ valid, message });

    // Return the valid flag
    return valid;
  };

  const checkCity = () => {
    const maxLength = 100; // Maximum allowed length for the city
    let message = ""; // Initialize error message to an empty string
    let valid = true; // Set valid to true by default

    // Check if the city is empty
    if (city.trim().length === 0) {
      message = "City is required !"; // Set the error message
      valid = false; // Set valid to false
    } else if (city.length > maxLength) {
      // Check if the city is too long
      message = `City must be up to ${maxLength} characters !`; // Set the error message
      valid = false; // Set valid to false
    }

    // Update the city state with the valid and message values
    setErrorCity({ valid, message });

    // Return the valid flag
    return valid;
  };

  const offPayStatus = () => {
    dispatch({
      type: "SET_PAY_STATUS",
      payStatus: false,
    });
  };

  useEffect(() => {
    if (!payStatus) {
      return;
    }

    // Clear any previous error messages
    setErrorAddress("");
    setErrorCity("");

    const isFieldsValid = checkFields();

    if (isFieldsValid) {
      processPayment();
    } else {
      // Delay resetting payStatus to give time for error message to display
      const delay = 1000;
      const timeoutId = setTimeout(() => {
        offPayStatus();
      }, delay);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [payStatus]);

  return (
    <div className="w-1/2 max-lg:w-full max-lg:mb-5">
      <p className="text-2xl font-semibold max-lg:m-5"> Delivery Information</p>

      <div className="w-full flex flex-row max-lg:flex-col">
        <div className="w-1/2 my-4 ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800">
            Full Name
          </label>

          <div className="flex flex-row cursor-pointer">
            <input
              type="text"
              value={name}
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              disabled
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800">
            Province
          </label>

          {/* Select Dropdown */}
          <div className="relative w-full mt-3.5">
            <select
              className=" w-full px-5 py-2.5 text-black  rounded-lg text-lg font-semibold text-center appearance-none cursor-pointer border-2 border-black  focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={selectLogProvince}
              value={currentstate}
            >
              <option value="" disabled>
                Select Province
              </option>
              {provincesOfNepal.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
            <ExpandMoreIcon className=" absolute top-3.5 right-5 svg-icons text-black" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row  max-lg:flex-col">
        <div className="w-1/2 my-4 ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800">
            Phone Number
          </label>

          <div className="flex flex-row cursor-pointer">
            <input
              type="number"
              value={phoneNumber}
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              disabled
            />
          </div>
        </div>

        <div className="w-1/2 flex flex-col ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800">
            District
          </label>

          {/* Select Dropdown */}
          <div className="relative w-full mt-3.5 ">
            <select
              className=" w-full px-5 py-2.5 text-black  rounded-lg text-lg font-semibold text-center appearance-none cursor-pointer border-2 border-black  focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={selectLogDistrictsByProvince}
              value={currentDistrict}
            >
              <option value="" disabled>
                Select District
              </option>
              {districtsByProvince[currentstate]?.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
            <ExpandMoreIcon className=" absolute top-3.5 right-5 svg-icons text-black" />
          </div>
        </div>
      </div>

      {/* City */}
      <div className="w-full flex flex-row">
        <div className="w-1/2 my-4 ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800">
            City
          </label>
          {/* Error Message City */}
          {!errorcity?.valid && (
            <ErrorMessageDeliveryInfo message={errorcity?.message} />
          )}
          <div className="flex flex-row cursor-pointer">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City Name"
              className={`block w-full px-4 py-2 mt-2 text-black-700 bg-white rounded-md border-2 focus:outline-none focus:ring focus:ring-opacity-40
              ${
                !errorcity?.valid
                  ? "border-red-500 focus:border-red-700 focus:ring-red-600"
                  : "border-black focus:border-black focus:ring-black"
              }
            `}
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="w-full flex flex-row">
        <div className="w-1/2 my-4 ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800">
            Address
          </label>
          {/* Error Message Address */}
          {!erroraddress?.valid && (
            <ErrorMessageDeliveryInfo message={erroraddress?.message} />
          )}
          <div className="flex flex-row cursor-pointer">
            <textarea
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Your Address"
              className={`block w-full px-4 py-2 mt-2 text-black-700 bg-white rounded-md border-2 focus:outline-none focus:ring focus:ring-opacity-40
              ${
                !erroraddress?.valid
                  ? "border-red-500 focus:border-red-700 focus:ring-red-600"
                  : "border-black focus:border-black focus:ring-black"
              }
            `}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
