import { dataBase } from "../firebaseConfig.js";
import bcrypt from "bcryptjs";

const changePassword = async (userId, currentPassword, newPassword) => {
  const startCountRef = `SignInWithPhoneNumber/+${userId.slice(
    0,
    3
  )}/${userId.slice(3, userId.length)}`;

  let isCorrect = false;

  const ref = dataBase.ref(startCountRef);

  await ref.once("value", (snapshot) => {
    if (snapshot.exists()) {
      return (isCorrect = checkPassword(
        snapshot.val().password,
        currentPassword
      ));
    }
  });

  if (isCorrect === true) {
    // updatePassword
    // change password into hash
    // store the hashed password into dataBase
  }
};

const checkPassword = (hashPassword, password) => {
  const check = bcrypt.compareSync(password, hashPassword);
  return check;
};

export { changePassword };
