import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "./App";


export default function RequireAuth(){
    const {auth} = useContext(authContext);
    if(!auth.token){
        return(
            <Navigate to="/" state={{ replace: true }} />
        )
    }else{
        return (
            <Outlet />
        )
    }
}