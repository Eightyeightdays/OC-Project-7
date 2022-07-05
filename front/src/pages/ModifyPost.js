import React, { useContext }from "react";
import authContext from "../App";
import { useParams } from "react-router-dom";

export default function ModifyPost(){
    const {auth, setAuth} = useContext(authContext);
    const params = useParams();
    
    const settings = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : auth.token,
        },
    };

    fetch(`http://localhost:3001/posts/${params.postId}`, settings)
        .then(response => response.json()) 
        .then(response => response) 
    return(
        <p>{auth.token}</p>
    )
}