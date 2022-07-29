import { Link } from "react-router-dom";
import React from "react";
import LogOutButton from "./buttons/LogOutButton";


export default function Navbar(props){
   const nav = props.nav;
    return(
        <>
            <div className="navbar">
                <LogOutButton />
                {nav ? <Link to="/home">Home</Link> : null}
                <Link className="new-post-link" to="/post/new">Create</Link> 
            </div>
            <div className="stop-footer"></div>
        </>
    )
}


