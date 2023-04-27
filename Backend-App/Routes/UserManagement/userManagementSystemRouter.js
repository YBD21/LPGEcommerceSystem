import express from "express";
import {
  verifyTokenAndDecodeToken,
  decodeToken,
} from "../LoginSystem/login.js";
import { getAllUserData } from "./userListingOperation.js";

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
    const { countryCode, phoneNumber } = req.body;
    const respond = editUserAccountType();
    res.json(respond);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default userManagementSystemRouter;
