import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import extractCookieData from "../utils/extractCookieData";
import { handleTitle, handleContent } from "../utils/postInputHandlers";

export default function EditPost(){
    const [post, setPost] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [titleAlert, setTitleAlert] = useState();
    const [contentAlert, setContentAlert] = useState();
    const navigate = useNavigate();
    const cookieData = extractCookieData(document.cookie);

    const params = useParams();
    const settings = {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : cookieData.token,
        },
    };

    useEffect(()=>{
        fetch(`http://localhost:3001/posts/${params.postId}`, settings)
                .then(response => response.json()) 
                .then(data => {
                    setPost(data);
                    setTitle(data.title);
                    setContent(data.content);
                }); 
    }, [])
    
    
    
    function handleEdit(){
        const form = document.getElementById("postForm");
        const formData = new FormData(form);
        formData.append("userId", cookieData.userId);
        const formObject = Object.fromEntries(formData.entries());
        
        if(title === "" || content === "" || formObject.file ===" "){
            return;
        }

        const settings = {
            method: "PUT",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Authorization" : cookieData.token,
            },
            body: formData,
        };
    
        fetch(`http://localhost:3001/posts/${params.postId}`, settings)
            .then(response => response.json()) 
            .then(data => {
                setPost(data);
                navigate("/home");
            }) 
    }

    return(
        <>
            <Link to={"/home"}>Home</Link> | {" "}
            {post && <>
            <form id="postForm" encType="multipart/form-data">
                    TITLE<input id="titleInput" type="text" name="title" maxLength="50" onChange={(event)=>handleTitle(setTitle, setTitleAlert, title, event)} value={title} />
                    {<p>{titleAlert}</p>}
                    CONTENT<textarea type="text" name="content" maxLength="1500" onChange={(event)=>handleContent(setContent, setContentAlert, content, event)} value={content} />
                    {<p>{contentAlert}</p>}
                    <img alt="" src={post.imageUrl}></img>
                    IMAGE<input type="file" name="image"/>
                </form>
                <button type="submit" onClick={handleEdit}>EDIT POST</button>
            </>}
        </>
    )
}