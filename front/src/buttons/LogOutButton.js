import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import handleErrors from "../utils/handleErrors";

export default function LogOutButton(){
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
        .then(handleErrors)
        .then(response =>{
            Cookies.remove("userId");
            Cookies.remove("token"); 
            Cookies.remove("admin");
            navigate("/");
        })
        .catch(error => console.log(error));
    }
    
    return(
        <button className="logout-button" type="button" onClick={handleLogOut}>LOGOUT</button>
    )
}