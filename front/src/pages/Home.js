import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Card from "../components/Card.js";
import Navbar from "../components/Navbar.js";
import Header from "../components/Header.js";
import handleErrors from "../utils/handleErrors";


export default function Home(){ 
    const [posts, setPosts] = useState([]);

    const settings = {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : Cookies.get("token"),
        },
    };
    
    useEffect(() => {
        fetch("http://localhost:3001/post", settings)
            .then(handleErrors)
            .then(response => {
                setPosts(response);
            })
            .catch(error => console.log(error));
    }, []);

    const handleDelete = (id)=>{
        const settings = {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": Cookies.get("token"),
            },
        };
        const getSettings = {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": Cookies.get("token"),
            },
        };

        fetch(`http://localhost:3001/post/${id}`, settings)
        .then(handleErrors)
        .then(response => {
            fetch("http://localhost:3001/post", getSettings)
            .then(handleErrors)
            .then(response => {
                setPosts(response);
                console.log("All posts fetched after delete");
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
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