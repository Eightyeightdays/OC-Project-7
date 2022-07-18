import { Link } from "react-router-dom";
import React from "react";
import LogOutButton from "../buttons/LogOutButton";


export default function Navbar(props){
   const nav = props.nav;
    return(
        <div className="navbar">
            <Link className="new-post-link" to="/post/new">Create</Link> 
            {nav ? <Link to="/home">Home</Link> : null}
            <LogOutButton />
        </div>
    )
}


