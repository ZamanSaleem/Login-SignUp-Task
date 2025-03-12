import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location);
  

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    if (user?.role === "user") {
      return <Navigate to="/admin/home" />;
    } else {
      return <Navigate to="/unauth-page" />;
    }
  }


  return <>{children}</>;
}

export default CheckAuth;
