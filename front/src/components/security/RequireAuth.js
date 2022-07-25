import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = Cookies.get("token");
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }