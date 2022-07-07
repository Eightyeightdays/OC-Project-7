import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { authContext } from "../App";
import Card from "../components/Card";
import LogOutButton from "../buttons/LogOutButton";

export default function DisplaySinglePost(){
    const [post, setPost] = useState();
    const {auth} = useContext(authContext);
    const params = useParams();

    const settings = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : auth.token,
        },
    };

    const getSinglePost = useCallback(function(){
         fetch(`http://localhost:3001/posts/${params.postId}`, settings)
        .then(response => response.json()) 
        .then(response => setPost(response)) 
    }, [])
   
    useEffect(() => {
        getSinglePost();
    }, [getSinglePost]);

    return(
        <>
            <Link to={"/home"}>Home</Link> | {" "}
            <Link to={"/post/new"}>Create New Post</Link> | {" "}
            <LogOutButton />
            {post && <Card post={post} />}
        </>
    )
}