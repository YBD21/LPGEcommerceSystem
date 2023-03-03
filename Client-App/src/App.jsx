import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { UserAuthContextProvider } from "./ContextAPI/UserAuthContext";
import { useStateValue } from "./ContextAPI/StateProvider";
import { decodeToken } from "react-jwt";
import AppRoutes from "./Routes/AppRoutes";
import Loading from "./component/Loading";
function App() {
  const [{ userData }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  // call backend to set UserData from http-Only Cookies
  const fetchUser = () => {
    axios
      .get("http://localhost:5000/user-data", {
        withCredentials: true, // enable sending and receiving cookies
      })
      .then(function (respond) {
        const data = decodeToken(respond.data);
        // const data = respond.data;
        console.log(data);
        if (data?.id) {
          dispatch({
            type: "SET_USER",
            userData: data,
          });
        }

        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch(function (error) {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  useEffect(() => {
    // if userData is empty then fetchUser
    if (userData.length === 0) {
      fetchUser();
    }
  }, []);

  return (
    <UserAuthContextProvider>
      <BrowserRouter>{loading ? <Loading /> : <AppRoutes />}</BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
