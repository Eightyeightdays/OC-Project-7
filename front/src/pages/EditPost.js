import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import extractCookieData from "../utils/extractCookieData";

export default function EditPost(){
    const [post, setPost] = useState();
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
                .then(data => setPost(data)); 
    }, [])
    
    function handleEdit(){
        const form = document.getElementById("postForm");
        const formData = new FormData(form);
        formData.append("userId", cookieData.userId);

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
                    TITLE<input type="text" name="title" defaultValue={post.title}/>
                    CONTENT<input type="text" name="content" defaultValue={post.content}/>
                    <img alt="" src={post.imageUrl}></img>
                    IMAGE<input type="file" name="image"/>
                </form>
                <button type="submit" onClick={handleEdit}>EDIT POST</button>
            </>}
        </>
    )
}