import React, { useState, useEffect } from "react";
import instance from "../../../../instance";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../../Loading";
import PopupPortal from "../../PopUp/PopupPortal";
import EditUserListPopUp from "./EditUserListPopUp";
const ViewUserList = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // to testing set false
  const [userList, setUserList] = useState({});
  const [userCount, setUserCount] = useState(1);
  const [currentEditData, setCurrentEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isSaveChanges, setIsSaveChanges] = useState(false);

  const itemsPerPage = 15;

  const handelPageNumberClick = (event) => {
    setPage(Number(event.target.id));
  };

  const getData = () => {
    instance
      .get("user-management/get-all-user", {
        withCredentials: true, // enable sending and receiving cookies
      })
      .then((respond) => {
        // console.log(respond.data);
        setUserList(respond.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
    setIsLoading(false);
  }, [isLoading]);

  const handelEdit = (userData) => {
    setIsEdit(true);
    setCurrentEditData(userData);
  };

  const handleChildEditUserPopup = (data) => {
    setIsEdit(data);
  };

  const handleChildSaveChanges = (data) => {
    setIsSaveChanges(data);
  };

  // count total number users
  const getTotalUserCount = () => {
    let totalUserCount = 0;
    Object.keys(userList).forEach((countryCode) => {
      Object.keys(userList[countryCode]).forEach((phoneNumber) => {
        totalUserCount++;
      });
    });

    return totalUserCount;
  };

  useEffect(() => {
    const totalCount = getTotalUserCount();
    setUserCount(totalCount);
    setPage(1);
  }, [userList]);

  const formatDateTime = (timestamp) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString("en-US", options); // format date and time
    return dateString;
  };

  // Get all users as an array
  const users = Object.keys(userList).flatMap((countryCode) =>
    Object.keys(userList[countryCode]).flatMap((phoneNumber) => {
      const user = userList[countryCode][phoneNumber];
      // console.log(user);
      return {
        countryCode,
        phoneNumber,
        created: user.Created,
        status: user.IsDisable ? "Disable" : "-",
        lastSeen: user.lastSeen,
        accountType: user.AccountType,
      };
    })
  );

  // console.log(users);

  const tableRows = users.map((user, index) => {
    const firstName = userList[user.countryCode][user.phoneNumber]["FirstName"];
    const lastName = userList[user.countryCode][user.phoneNumber]["LastName"];
    const fullName = firstName + " " + lastName;
    const fullPhoneNumber = user.countryCode + "-" + user.phoneNumber;

    const created = formatDateTime(user.created);
    const lastSeen = formatDateTime(user.lastSeen);

    // console.log(fullName);
    return (
      <tr key={index}>
        <td className="border px-4 py-2.5 font-bold">{index + 1}</td>
        <td className="border px-4 py-2">{fullName}</td>
        <td className="border px-4 py-2">{fullPhoneNumber}</td>
        <td className="border px-4 py-2 text-orange-700 font-bold">
          {user.accountType}
        </td>
        <td className="border px-4 py-2 font-bold">{created}</td>
        <td className="border px-4 py-2 font-bold">{lastSeen}</td>
        <td className="border px-4 py-2 font-bold">{user.status}</td>
        <td className="border px-4 py-2 font-bold">
          <button
            className="py-2 px-3.5 bg-black mr-3 rounded-lg group relative"
            onClick={() => handelEdit(user)}
          >
            {/* Edit */}
            <EditIcon className="scale-125 text-white pointer-events-none" />
            <div className="absolute bottom-5 right-8 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 max-sm:group-hover:opacity-0 transition-opacity duration-300 bg-black py-1 px-2 rounded-md">
              <span className="text-white font-semibold"> Edit </span>
            </div>
          </button>
        </td>
      </tr>
    );
  });

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTableRows = tableRows.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(userCount / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number}>
        <button
          id={number}
          onClick={handelPageNumberClick}
          className={`${
            number === page ? "bg-gray-400 text-white" : "bg-white text-black"
          } hover:bg-gray-500 hover:text-white py-2 px-4 border-2
             border-black rounded ml-2`}
        >
          {number}
        </button>
      </li>
    );
  });

  if (isLoading) {
    return <Loading />; // render loading component when isLoading is true
  }

  return (
    <div className="flex-1 bg-white p-2">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8">User Listing</h2>
      <button
        className="px-5 py-2.5 tracking-wide bg-black 
        rounded-lg text-center mr-2 mb-2 focus:outline-none 
        focus:ring-2 focus:ring-black focus:ring-opacity-50 
        active:ring-4 active:ring-black active:ring-opacity-50"
        onClick={getData}
      >
        <p className="text-white">Refresh</p>
      </button>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              S.N
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Customer Name
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              PhoneNumber
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Account Type
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Created
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Last Seen
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Status
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="text-center">{currentTableRows}</tbody>
      </table>

      <ul className="flex pl-1 list-none my-5">{renderPageNumbers}</ul>

      {isEdit ? (
        <PopupPortal>
          <EditUserListPopUp
            onChild={handleChildEditUserPopup}
            isChange={handleChildSaveChanges}
            currentData={currentEditData}
            userList={userList}
            prevIsChange={isSaveChanges}
          />
        </PopupPortal>
      ) : (
        false
      )}
    </div>
  );
};

export default ViewUserList;
