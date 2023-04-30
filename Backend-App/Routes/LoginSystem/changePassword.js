import bcrypt from "bcryptjs";
import { dataBase } from "../firebaseConfig.js";
import { checkPassword } from "./login.js";

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
    await ref.update({ password: newPassword });
  }
  return isCorrect;
};

export { changePassword };
