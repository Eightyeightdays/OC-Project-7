import React, { useEffect, useState, useCallback, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { authContext } from "../App";
import LogOutButton from "../buttons/LogOutButton.js";
import Card from "../components/Card.js";

export default function Home(){ 
    const navigate = useNavigate();
    const {auth} = useContext(authContext);
    const [posts, setPosts] = useState([]);
    const [like, setLike]= useState(0);
    const [dislike, setDislike]= useState(0);
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
    
    function likePost(id){
        const vote = {vote: "like"};
        const settings = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : token,
            },
            body: JSON.stringify(vote)
        };
        fetch(`http://localhost:3001/posts/${id}/like`, settings)
            .then(response => response.json())
            .then(data => {
                switch(data.message){
                    case "LIKE ADDED":
                    setLike(like +1); 
                    break;
                    case "LIKE SWAPPED" :
                    setLike(like +1);
                    setDislike(dislike -1);
                    break;
                    case "LIKE REMOVED":
                    setLike(like -1);
                }
            })
    }
    function dislikePost(id){
        const vote = {vote: "dislike"};
        const settings = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : token,
            },
            body: JSON.stringify(vote)
        };
        fetch(`http://localhost:3001/posts/${id}/dislike`, settings)
        .then(response => response.json())
        .then(data => {
            switch(data.message){
                case "DISLIKE ADDED":
                setDislike(dislike +1); 
                break;
                case "DISLIKE SWAPPED" :
                setDislike(dislike +1);
                setLike(like -1);
                break;
                case "DISLIKE REMOVED":
                setDislike(dislike -1);
            }
        })
    }

    function handleEdit(id){
        let url = `/post/${id}/edit`;
        navigate(url);
    }

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

        fetch(`http://localhost:3001/posts/${id}`, settings)
        .then(response => {
            response.json();
            if(response.status === 200){
                navigate("/home");
                alert("Post deleted");
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
            
            {posts.sort((a,b)=> b.datePosted - a.datePosted).map((item, index)=>(
                <Card key={index} post={item} like={like} likePost={likePost} dislike={dislike} dislikePost={dislikePost} handleEdit={handleEdit} handleDelete={handleDelete}/>
            ))}
            
            <Outlet />
        </>
    ) 
}