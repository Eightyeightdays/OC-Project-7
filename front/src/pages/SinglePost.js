import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function DisplaySinglePost(){
    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState();
    
    const settings = {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : Cookies.get("token"),
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
                "Authorization": Cookies.get("token"),
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
        <div className="flex-column">
            <Header />
            {post && <Card post={post} handleDelete={handleDelete}/>}
            <Navbar nav={true} />
        </div>
    )
}