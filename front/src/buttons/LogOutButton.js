import React from "react";
import { useContext } from "react";
import { authContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function LogOutButton(){
    const {setAuth} = useContext(authContext);
    const navigate = useNavigate();

    function handleLogOut(){
        setAuth({token: null, userId: null});
        navigate("/");
        alert("You have been logged out")
    }
    
    return(
        <button type="submit" onClick={handleLogOut}>LOGOUT</button>
    )
}