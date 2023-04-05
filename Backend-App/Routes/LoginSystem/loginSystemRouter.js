import express from "express";
import { login, verifyToken } from "./login.js";
import { passwordforget } from "./passwordforget.js";
import { resetPassword } from "./resetpassword.js";
import { createAccount } from "./signup.js";

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
    sameSite: "none", // set to 'strict' to prevent CSRF attacks
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
      sameSite: "none", // set to 'strict' to prevent CSRF attacks
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

export default loginSystemRouter;
