import { createContext, useContext} from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth_app} from "../Firebase/FirebaseConfig";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
       'expired-callback' : () => {
      // Response expired. Ask user to solve reCAPTCHA again.
        recaptchaVerifier.render();
       }
      },
      auth_app
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth_app, number, recaptchaVerifier);
  }


  return (
    <userAuthContext.Provider
      value={{
        setUpRecaptha
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}