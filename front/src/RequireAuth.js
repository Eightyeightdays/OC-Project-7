import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useContext } from "react";
// import { authContext } from "./App";


// export default function RequireAuth(){
//     const {auth} = useContext(authContext);
//     if(!auth.token){    // should I verify for cookie instead?
//         return(
//             <Navigate to="/" state={{ replace: true }} />
//         )
//     }else{
//         return (
//             <Outlet />
//         )
//     }
// }



export default function RequireAuth({ children, redirectTo }) {
    // const {auth} = useContext(authContext);
    const cookieToken = document.cookie.slice(6);
    let isAuthenticated = cookieToken;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }