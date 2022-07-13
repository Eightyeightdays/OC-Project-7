import React, { useEffect, useState, useCallback, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import { authContext } from "../App";
import LogOutButton from "../buttons/LogOutButton.js";
import Card from "../components/Card.js";

export default function Home(){ 
    const cookieToken = document.cookie.slice(6);
    const navigate = useNavigate();
    // const {auth} = useContext(authContext);
    const [posts, setPosts] = useState([]);
    // const token = auth.token;

    const settings = {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : cookieToken,
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

    const handleDelete = (id)=>{
        const settings = {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": cookieToken,
            },
        };
        const getSettings = {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": cookieToken,
            },
        };

        fetch(`http://localhost:3001/posts/${id}`, settings)
        .then(response => {
            response.json();
            if(response.status === 200){
                fetch("http://localhost:3001/posts", getSettings)
                .then(response => response.json())
                .then(response => setPosts(response))
            }})
        };
    
        
    return(
        <>      
            <div id="header">
                <h1>GROUPOMANIA</h1>
                <Link to={"/post/new"}>Create New Post</Link> | {" "}
                <LogOutButton />
            </div>
            
            {posts.sort((a,b)=> b.datePosted - a.datePosted).map((post, index)=>(
                <Card key={index} post={post} handleDelete={handleDelete}/>
            ))}
            
            <Outlet />
        </>
    ) 
}