import React from "react";
import Logo from "../assets/icon-left-font-monochrome-black.png";

export default function Header(){
    return(
        <div className="header" id="header">
            <img className="header-logo" src={Logo} alt="Groupomania logo"></img>
        </div>
    )
}