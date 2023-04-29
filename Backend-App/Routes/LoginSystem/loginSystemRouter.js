import express from "express";
import { decodeToken, login, verifyToken } from "./login.js";
import { passwordforget } from "./passwordforget.js";
import { resetPassword } from "./resetpassword.js";
import { createAccount } from "./signup.js";
import { changePassword } from "./changePassword.js";

const loginSystemRouter = express.Router();

// req = request & res = respond

// Define routes for userRouter
loginSystemRouter.get("/user-data", (req, res) => {
  const accessToken = req.cookies.userData;

  if (!accessToken || !verifyToken(accessToken)) {
    res.status(401).send("Unauthorized");
  } else {
    res.json(accessToken);
  }
  console.log("User Requested AccessToken !");
});

loginSystemRouter.delete("/user-data", (req, res) => {
  res.clearCookie("userData", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.send("Cookie cleared!");
  console.log("User LogOut X_X !");
});

loginSystemRouter.post("/login", async (req, res) => {
  let data = req.body;
  console.log(`User : ${data.phoneNumber} Trying To Logged In ! `);

  const respond = await login(data.phoneNumber, data.encPass);

  if (respond?.Message === true) {
    // set cookie
    res.cookie("userData", respond.accessToken, {
      secure: true, // set to true to enable sending the cookie only over HTTPS
      httpOnly: true, // set to true to prevent client-side scripts from accessing the cookie
      sameSite: "none",
    });
    console.log(`User : ${data.phoneNumber} is Logged In ! `);
  }

  res.json(respond);
});

loginSystemRouter.post("/forget-password", async (req, res) => {
  let data = req.body;
  const respond = await passwordforget(data.PhoneNumber);
  //  console.log(respond);
  res.json(respond);
});

loginSystemRouter.patch("/reset-password", async (req, res) => {
  let data = req.body;
  const respond = await resetPassword(data.PhoneNumber, data.EncPass);
  res.json(respond);
});

loginSystemRouter.post("/signup", async (req, res) => {
  let data = req.body;
  const respond = await createAccount(
    data.PhoneNumber,
    data.encPass,
    data.FirstName,
    data.LastName,
    data.Created
  );
  res.json(respond);
});

loginSystemRouter.post("/change-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  // access HttpOnly Cookie
  const { userData: accessToken } = req.cookies;
  const { id: userId } = await decodeToken(accessToken);

  const respond = await changePassword(userId, currentPassword, newPassword);
  res.json(respond);
});

export default loginSystemRouter;
