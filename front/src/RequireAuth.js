import React from "react";
import { Navigate } from "react-router-dom";
import extractCookieData from "./utils/extractCookieData";

export default function RequireAuth({ children, redirectTo }) {
    const cookieData = extractCookieData();
    let isAuthenticated = cookieData.token;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
