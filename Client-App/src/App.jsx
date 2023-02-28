import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "./ContextAPI/UserAuthContext";
import { useStateValue } from "./ContextAPI/StateProvider";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { hashKey } from "./component/Login_System/hashKey";
import AppRoutes from "./Routes/AppRoutes";
import Loading from "./component/Loading";
function App() {
  const [{ userData }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setUser = () => {
      const token = Cookies.get(hashKey.userData);
      const data = decodeToken(token);

      if (data?.id) {
        dispatch({
          type: "SET_USER",
          userData: data,
        });
      }

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    setUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <UserAuthContextProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UserAuthContextProvider>
      )}
    </>
  );
}

export default App;
