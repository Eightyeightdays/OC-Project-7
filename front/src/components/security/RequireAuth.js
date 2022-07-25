import React from "react";
import { Navigate } from "react-router-dom";
import extractCookieData from "../../utils/extractCookieData";

export default function RequireAuth({ children, redirectTo }) {
    const cookieData = extractCookieData(document.cookie);
    let isAuthenticated = cookieData.token;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }