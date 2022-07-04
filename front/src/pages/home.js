import React, { useEffect, useState, useCallback } from "react";
import Post from "../AllPosts.js";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../App";
import LogOutButton from "../buttons/LogOutButton.js";

export default function Home(){
    const [posts, setPosts] = useState();
    const {auth} = useContext(authContext);

    const settings = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : auth.token,
        },
    };
    
    const getAllPosts = useCallback(function (count) {
        fetch("http://localhost:3001/posts", settings)
            .then(response => response.json())
            .then(response => setPosts(response))
    }, [])

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return(
        <>      
            <div id="header">
                <h1>GROUPOMANIA</h1>
                <Link to={"/post/new"}>Create New Post</Link> | {" "}
                <LogOutButton />
            </div>
            
            {posts && posts.sort((a,b)=> b.datePosted - a.datePosted).map((item, index)=>(
                <Link to={`/post/${item._id}`} key={index}>
                    <Post post={item} />
                </Link>
            ))}

            <Outlet />
        </>
    ) 

}