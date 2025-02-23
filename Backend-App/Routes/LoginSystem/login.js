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
    const parsedPassword = bytesOfPassword.toString(CryptoJS.enc.Utf8);

    return parsedPassword.toString();
  };

  const plainTextPass = decryptPassword();

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
        const firstName = snapshot.val().FirstName;
        const lastName = snapshot.val().LastName;
        const role = snapshot.val().AccountType;

        const token = generateToken(firstName, lastName, role, phoneNumber);
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

const checkPassword = (hashPassword, password) => {
  const check = bcrypt.compareSync(password, hashPassword);
  return check;
};

const generateToken = (userFirstName, userLastName, userRole, number) => {
  //firstName,lastName,mobileNumber,accountType

  const filterData = {
    firstName: userFirstName,
    lastName: userLastName,
    role: userRole,
    id: number,
  };

  const token = jwt.sign(filterData, secretKey, { expiresIn: "1h" });

  return token;
};

const verifyToken = (token) => {
  let sendData = false;
  jwt.verify(token, secretKey, function (err) {
    if (err) {
      console.log(err.message);
    } else {
      // console.log(decoded);
      sendData = true;
    }
  });
  return sendData;
};

const verifyTokenAndDecodeToken = async (token) => {
  let sendData = {};
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      console.log(err.message);
      sendData = { error: `${err.message}` };
    } else {
      sendData = { ...decoded };
    }
  });
  return sendData;
};

const decodeToken = async (token) => {
  const decoded = await jwt_decode(token);
  return decoded;
};

export {
  login,
  verifyToken,
  decodeToken,
  verifyTokenAndDecodeToken,
  generateToken,
  checkPassword,
};
