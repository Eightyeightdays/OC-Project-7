import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { authContext } from "../App";
import LikeButton from "../buttons/LikeButton"
import LogOutButton from "../buttons/LogOutButton";
import EditAndDeleteButton from "../buttons/EditAndDeleteButton";
import { styles } from "../styles";

export default function DisplaySinglePost(){
    const [post, setPost] = useState();
    const {auth} = useContext(authContext);
    const params = useParams();
    const userId = auth.userId;
    const token = auth.token;

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
    }, []);
    
       return(
        <>
        <Link to="/home">HOME</Link> | {" "}
        <LogOutButton />
        <div style={styles.displaySinglePost}>
            {post && 
                <div style={styles.post}>
                    <p>User: {post.userId}</p>
                    <p>Title: {post.title}</p>
                    <img alt="" style={styles.image} className="postImage" src={post.imageUrl}></img>
                    <p>Message: {post.content}</p>
                    <p>Likes: {post.likes}</p>
                    <p>Disikes: {post.dislikes}</p>
                    <p>Date posted: {post.displayDatePosted}</p>
                    {post.displayDateEdited && <p>Date edited: {post.displayDateEdited}</p>}
                    <LikeButton token={token} postId={post._id}/>
                    <EditAndDeleteButton userId={userId} token={token} postId={params.postId} />
                </div>
            }
        </div>
        </>
    ) 
}