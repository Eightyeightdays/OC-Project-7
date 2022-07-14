import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import extractCookieData from "../utils/extractCookieData";
import { handleTitle, handleContent } from "../utils/postInputHandlers";


export default function CreatePost(){
    const navigate = useNavigate();
    const cookieData = extractCookieData(document.cookie);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleAlert, setTitleAlert] = useState();
    const [contentAlert, setContentAlert] = useState();
    
    function handleCreate(){
        const form = document.getElementById("postForm");
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        if(title === "" || content === "" || formObject.file ===" "){
            return;
        }

        const settings = {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Authorization": cookieData.token,
            },
            body: formData,
        };

        fetch("http://localhost:3001/posts", settings)  
        .then(response => {
            response.json()
            if(response.status === 201){
                navigate("/home");
            }else{
                console.log(response)                        // TODO !!!!!
            }
        })
    }
    
    return(
        <>
            <Link to={"/home"}>Home</Link> | {" "}
            <form id="postForm" encType="multipart/form-data">
                TITLE<input id="titleInput" type="text" name="title" maxLength="50" onChange={(event)=>handleTitle(setTitle, setTitleAlert, title, event)} value={title}/>
                {<p>{titleAlert}</p>}
                CONTENT<textarea id="contentInput" type="text" name="content" maxLength="1500" onChange={(event)=>handleContent(setContent, setContentAlert, content, event)} value={content}/>
                {<p>{contentAlert}</p>}
                IMAGE<input type="file" name="image" />
            </form>
            <button type="submit" onClick={handleCreate}>CREATE POST</button>
        </>
    )
}

