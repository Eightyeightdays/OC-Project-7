import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "./pages/login";



export default function RequireAuth(){
const credentials = useContext(authContext);
    console.log(credentials)
    if(!credentials.loggedIn){
        return(
            <Navigate to="/login" state={{ replace: true }} />
        )
    }else{
        return (
            <Outlet />
        )
    }
    
}