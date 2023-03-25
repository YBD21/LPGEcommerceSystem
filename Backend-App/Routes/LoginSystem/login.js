import { dataBase } from "../firebaseConfig.js";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import * as dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const login = async (phoneNumber, encPassword) => {
  let sendData = { Message: "", Error: "" };
  // console.log(typeof(phoneNumber));

  const startCountRef = `SignInWithPhoneNumber/+${phoneNumber.slice(
    0,
    3
  )}/${phoneNumber.slice(3, phoneNumber.length)}`;

  const decryptPassword = () => {
    // decrypt
    const bytesOfPassword = CryptoJS.AES.decrypt(encPassword, phoneNumber);
    // parse into meaningful information
    const parsedPassword = JSON.parse(
      bytesOfPassword.toString(CryptoJS.enc.Utf8)
    );

    return parsedPassword.toString();
  };

  const plainTextPass = decryptPassword();

  const checkPassword = (hashPassword, password) => {
    const check = bcrypt.compareSync(password, hashPassword);
    return check;
  };

  const ref = dataBase.ref(startCountRef);

  await ref.once("value", (snapshot) => {
    // console.log(snapshot.val());
    // if phone number is found
    if (snapshot.exists()) {
      // check if account is disable
      if (snapshot.val().IsDisable === true) {
        return (sendData = { ...sendData, Error: "Disable Account" });
      } else {
        const currentDate = new Date().toString();
        ref.update({
          lastSeen: currentDate,
        });

        // createJWToken

        const token = generateToken(snapshot, phoneNumber);
        // checkPassword and send to client
        return (sendData = {
          ...sendData,
          Message: checkPassword(snapshot.val().password, plainTextPass),
          accessToken: token,
        });
      }
    }
    // if number does not match
    else {
      return (sendData = { ...sendData, Error: "Incorrect Data" });
    }
  });

  return sendData;
};

const generateToken = (data, number) => {
  //firstName,lastName,mobileNumber,accountType

  const filterData = {
    firstName: data.val().FirstName,
    lastName: data.val().LastName,
    role: data.val().AccountType,
    id: number,
  };

  const token = jwt.sign(filterData, secretKey, { expiresIn: "1h" });

  return token;
};

const verifyToken = (token) => {
  let sendData = null;
  jwt.verify(token, secretKey, function (err) {
    if (err) {
      console.log(err.message);
      sendData = false;
    } else {
      // console.log(decoded);
      sendData = true;
    }
  });
  return sendData;
};

const decodeToken = async (token) => {
  const decoded = await jwt_decode(token);
  return decoded;
};

export { login, verifyToken, decodeToken };
