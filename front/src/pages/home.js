import React, { useEffect, useState, useCallback, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { authContext } from "../App";
import LogOutButton from "../buttons/LogOutButton.js";
import Card from "../components/Card.js";

export default function Home(){ 
    const navigate = useNavigate();
    const {auth} = useContext(authContext);
    const [posts, setPosts] = useState([]);
    const token = auth.token;
    const userId = auth.userId;
   
    const settings = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : token,
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
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({userId})
        };
        const getSettings = {
            method: "GET",
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
                fetch("http://localhost:3001/posts", getSettings)
                .then(response => response.json())
                .then(response => setPosts(response))
                /// if current page !== home navigate home
                navigate("/home");
                }
            })
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