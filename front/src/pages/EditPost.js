import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../App";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost(){
    const {auth, setAuth} = useContext(authContext);
    const [post, setPost] = useState();
    const navigate = useNavigate();

    const params = useParams();
    const settings = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : auth.token,
        },
    };

    useEffect(()=>{
        fetch(`http://localhost:3001/posts/${params.postId}`, settings)
                .then(response => response.json()) 
                .then(data => setPost(data)); 
    }, [])
    
    function handleEdit(){
        const postForm = document.getElementById("postForm");
        const updatedPost = Object.fromEntries(new FormData(postForm).entries());
        const settings = {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : auth.token,
            },
            body: JSON.stringify({...updatedPost, userId: auth.userId})
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
            {post && <>
            <form id="postForm">
                    TITLE<input type="text" name="title" defaultValue={post.title}/>
                    CONTENT<input type="text" name="content" defaultValue={post.content}/>
                </form>
                <button type="submit" onClick={handleEdit}>EDIT POST</button>
            </>}
        </>
    )
}