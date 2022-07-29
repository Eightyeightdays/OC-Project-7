import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import handleErrors from "../../utils/handleErrors";
import createSettings from "../../utils/createSettings";

export default function LogOutButton(){
    const navigate = useNavigate();
    const settings = createSettings("POST")

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