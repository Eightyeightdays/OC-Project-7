import React, { useEffect, useState, useCallback } from "react";
import extractCookieData from "../utils/extractCookieData.js";
import Card from "../components/Card.js";
import Navbar from "../components/Navbar.js";
import Header from "../components/Header.js";

export default function Home(){ 
    const [posts, setPosts] = useState([]);
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
    
    const getAllPosts = useCallback(function (count) {
        fetch("http://localhost:3001/posts", settings)
            .then(response => response.json())
            .then(response => {
                setPosts(response);
            })
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
                "Authorization": cookieData.token,
            },
        };
        const getSettings = {
            method: "GET",
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
                fetch("http://localhost:3001/posts", getSettings)
                .then(response => response.json())
                .then(response => {
                    setPosts(response);
                    console.log("All posts fetched after delete");
                })
            }})
        };
        
    return(    
        <div className="flex-column">
            <Header />
            {posts.sort((a,b)=> b.sortDate - a.sortDate).map((post, index)=>(
                <Card key={index} post={post} handleDelete={handleDelete}/>
            ))}
            <Navbar nav={false} />
        </div>
    ) 
}