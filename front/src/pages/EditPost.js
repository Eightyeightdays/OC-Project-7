import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../App";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function EditPost(){
    const {auth, setAuth} = useContext(authContext);
    const [post, setPost] = useState();
    const navigate = useNavigate();

    const cookieToken = document.cookie.slice(6);

    const params = useParams();
    const settings = {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : cookieToken,
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
        formData.append("userId", auth.userId);

        const settings = {
            method: "PUT",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Authorization" : cookieToken,
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