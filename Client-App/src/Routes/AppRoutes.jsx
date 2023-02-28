import React from "react";
import { useStateValue } from "../ContextAPI/StateProvider";
import AccessOnceRoute from "./AccessOnceRoute";
import AdminRoute from "./AdminRoute";
import ClientRoute from "./ClientRoute";
const AppRoutes = () => {
  // import userData from contexProvider or dataLayer
  const [{ userData }] = useStateValue();
  const role = userData?.role;

  switch (role) {
    case "Admin":
      return <AdminRoute />;

    case "Client":
      return <ClientRoute />;

    default:
      return <AccessOnceRoute />;
  }
};

export default AppRoutes;
