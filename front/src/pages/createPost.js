import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../App";

export default function CreatePost(){
    const [post, setPost] = useState();
    const navigate = useNavigate();
    const {auth} = useContext(authContext);
    
    function handlePost(){
        const form = document.getElementById("postForm");
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        if(formObject.title === "" || formObject.content === "" || formObject.file ===" "){
            return;
        }
       
        const settings = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": auth.token,
            },
            body: formData,
        };

        fetch("http://localhost:3001/posts", settings)  
        .then(response => response.json())
        .then(data => {
            setPost(data);
            navigate("/home");
        });
    }
    
    return(
        <>
            <form id="postForm" encType="multipart/form-data">
                TITLE<input type="text" name="title" maxLength="50"/>
                CONTENT<input type="text" name="content" maxLength="1500" />
                IMAGE<input type="file" name="image" />
            </form>
            <button type="submit" onClick={handlePost}>CREATE POST</button>
        </>
    )
}

