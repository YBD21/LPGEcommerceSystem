import React from "react";
import { useStateValue } from "../ContextAPI/StateProvider";
import AccessOnceRoute from "./AccessOnceRoute";
import AdminRoute from "./AdminRoute";
import ClientRoute from "./ClientRoute";
const AppRoutes = () => {
  // import userData from contexProvider or dataLayer
  const [{ userData }] = useStateValue();
  const role = userData?.role;

  if (!role) {
    return <AccessOnceRoute />;
  }
  if (role === "Admin") {
    return <AdminRoute />;
  }
  if (role === "Client") {
    return <ClientRoute />;
  }
};

export default AppRoutes;
