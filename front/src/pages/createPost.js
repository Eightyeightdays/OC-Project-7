import React from "react";
import { useNavigate, Link } from "react-router-dom";
import extractCookieData from "../utils/extractCookieData";


export default function CreatePost(){
    const navigate = useNavigate();
    const cookieData = extractCookieData(document.cookie);
    
    function handleCreate(){
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
                console.log(response)
            }
        })
    }
    
    return(
        <>
            <Link to={"/home"}>Home</Link> | {" "}
            <form id="postForm" encType="multipart/form-data">
                TITLE<input type="text" name="title" maxLength="50"/>
                CONTENT<input type="text" name="content" maxLength="1500" />
                IMAGE<input type="file" name="image" />
            </form>
            <button type="submit" onClick={handleCreate}>CREATE POST</button>
        </>
    )
}

