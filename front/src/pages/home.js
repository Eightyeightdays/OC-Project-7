import React, { useEffect, useState, useCallback, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { authContext } from "../App";
import LogOutButton from "../buttons/LogOutButton.js";
import Card from "../components/Card.js";

export default function Home(){
    const [posts, setPosts] = useState([]);
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
            
            {posts.sort((a,b)=> b.datePosted - a.datePosted).map((item, index)=>(
                <Card key={index} post={item} />
            ))}
            
            <Outlet />
        </>
    ) 
}