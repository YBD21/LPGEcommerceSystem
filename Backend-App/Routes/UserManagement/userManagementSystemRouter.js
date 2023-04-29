import express from "express";
import {
  verifyTokenAndDecodeToken,
  decodeToken,
  generateToken,
} from "../LoginSystem/login.js";
import { editUserAccountType, getAllUserData } from "./userListingOperation.js";
import { updateUserName } from "./userClientOperation.js";

const userManagementSystemRouter = express.Router();

userManagementSystemRouter.get("/get-all-user", async (req, res) => {
  try {
    const { userData: accessToken } = req.cookies;
    const { id, role, error } = await verifyTokenAndDecodeToken(accessToken);

    if (error || role !== "Admin") {
      return res.json(error);
    }
    console.log(
      `User ID : ${id} with Role of : ${role} is Accessing getAllOrder !`
    );
    const data = await getAllUserData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userManagementSystemRouter.patch("/edit-user", async (req, res) => {
  try {
    const { userData: accessToken } = req.cookies;
    const { id, role } = await decodeToken(accessToken);

    if (role !== "Admin") {
      return res.json("Unauthorized Access !");
    }
    console.log(
      `User ID : ${id} with Role of : ${role} is Accessing getAllOrder !`
    );
    const { countryCode, phoneNumber, isDisable, accountType } = req.body;
    const respond = await editUserAccountType(
      countryCode,
      phoneNumber,
      isDisable,
      accountType
    );
    res.json(respond);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userManagementSystemRouter.patch("/edit-userName", async (req, res) => {
  const { userData: accessToken } = req.cookies;
  const { FirstName: firstName, LastName: lastName } = req.body;

  const { id: userId } = await decodeToken(accessToken);
  // console.log(userId);

  console.log(`attepmting Renaming UserName of ${userId} ...`);

  const updatedUserData = await updateUserName(firstName, lastName, userId);

  // generate accessToken here
  const newToken = generateToken(
    updatedUserData.firstName,
    updatedUserData.lastName,
    updatedUserData.role,
    updatedUserData.userId
  );

  // replace previous cookie to new cookies with new userName
  res.cookie("userData", newToken, {
    secure: true, // set to true to enable sending the cookie only over HTTPS
    httpOnly: true, // set to true to prevent client-side scripts from accessing the cookie
    sameSite: "none",
  });

  console.log(`Renaming UserName of ${userId} Successful`);
  console.log(
    `New UserName : ${updatedUserData.firstName}  ${updatedUserData.lastName} `
  );

  res.json(newToken);
});

export default userManagementSystemRouter;
