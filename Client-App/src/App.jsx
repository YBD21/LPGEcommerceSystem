import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserAuthContextProvider } from "./ContextAPI/UserAuthContext";
import { useStateValue } from "./ContextAPI/StateProvider";
import { decodeToken } from "react-jwt";
import AppRoutes from "./Routes/AppRoutes";
import Loading from "./component/Loading";
import instance from "./instance";
function App() {
  const [{ userData }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  // call backend to set UserData from http-Only Cookies
  const fetchUser = () => {
    instance
      .get("/login-system/user-data", {
        withCredentials: true, // enable sending and receiving cookies
      })
      .then(function (respond) {
        const data = decodeToken(respond.data);
        // const data = respond.data;
        // console.log(data);
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

  const route = createBrowserRouter([
    {
      path: "*",
      element: <AppRoutes />,
    },
  ]);

  return (
    <UserAuthContextProvider>
      {loading ? <Loading /> : <RouterProvider router={route} />}
    </UserAuthContextProvider>
  );
}

export default App;
