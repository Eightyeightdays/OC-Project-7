import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { authContext } from "../App";
import Card from "../components/Card";
import LogOutButton from "../buttons/LogOutButton";

export default function DisplaySinglePost(){
    const navigate = useNavigate();
    const params = useParams();
    const {auth} = useContext(authContext);
    const [post, setPost] = useState();
    const token = auth.token;
    
    const settings = {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : auth.token,
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
                "Authorization": token,
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
            <Link to={"/home"}>Home</Link> | {" "}
            <Link to={"/post/new"}>Create New Post</Link> | {" "}
            <LogOutButton />
            {post && 
            <>
                <Card post={post} handleDelete={handleDelete}/>
            </>
            }
        </>
    )
}