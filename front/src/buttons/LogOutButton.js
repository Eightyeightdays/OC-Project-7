import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
        .then(response =>{
            response.json();
            if(response.status === 200){
                Cookies.remove("userId");
                Cookies.remove("token"); 
                Cookies.remove("admin");
                navigate("/");
            }
        })
        
    }
    
    return(
        <button className="logout-button" type="button" onClick={handleLogOut}>LOGOUT</button>
    )
}