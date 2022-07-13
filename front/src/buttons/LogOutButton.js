import React from "react";
import { useContext } from "react";
import { authContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function LogOutButton(){
    const {setAuth} = useContext(authContext);
    const navigate = useNavigate();
    const settings = {
        method: "POST",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    };

    function handleLogOut(){
        fetch("http://localhost:3001/auth/logout", settings)
        .then(response => response.json());
        
        setAuth({token: null, userId: null});
        navigate("/");
        console.log("You have been logged out")
    }
    
    return(
        <button type="submit" onClick={handleLogOut}>LOGOUT</button>
    )
}