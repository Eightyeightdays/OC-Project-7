import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import handleErrors from "../utils/handleErrors";

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
        .then(handleErrors)
        .then(post => {setPost(post)}) 
        .catch(error => console.log(error))
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
        .then(handleErrors)
        .then(response => {
            navigate("/home");
            console.log("Post deleted");
            })
        .catch(error => console.log(error))
        };

    return(
        <div className="flex-column">
            <Header />
            {post && <Card post={post} handleDelete={handleDelete}/>}
            <Navbar nav={true} />
        </div>
    )
}