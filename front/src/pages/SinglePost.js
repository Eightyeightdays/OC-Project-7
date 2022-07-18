import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import LogOutButton from "../buttons/LogOutButton";
import extractCookieData from "../utils/extractCookieData";
import Navbar from "../components/Navbar";

export default function DisplaySinglePost(){
    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState();
    const cookieData = extractCookieData(document.cookie);
    
    const settings = {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : cookieData.token,
        },
    };

    const getSinglePost = useCallback(function(){
         fetch(`http://localhost:3001/posts/${params.postId}`, settings)
        .then(response => response.json()) 
        .then(post => {setPost(post)}) 
    }, [])
   
    useEffect(() => {
        getSinglePost();
    }, [getSinglePost]);

    const handleDelete = (id)=>{
        const settings = {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": cookieData.token,
            },
        };

        fetch(`http://localhost:3001/posts/${id}`, settings)
        .then(response => {
            response.json();
            if(response.status === 200){
                navigate("/home");
                console.log("Post deleted");
                }
            })
        };

    return(
        <>
            {post && <Card post={post} handleDelete={handleDelete}/>}
            <Navbar nav={true} />
        </>
    )
}