import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { authContext } from "../App";
import DeleteButton from "../buttons/DeleteButton"
import LikeButton from "../buttons/LikeButton"
import ModifyButton from "../buttons/ModifyButton"
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
        <Link to="/home">HOME</Link>
        <div style={styles.displaySinglePost}>
            {post && 
                <div style={styles.post}>
                    <p>User: {post.userId}</p>
                    <p>Title: {post.title}</p>
                    <p>Message: {post.content}</p>
                    <p>Likes: {post.likes}</p>
                    <p>Disikes: {post.dislikes}</p>
                    <p>Date posted: {post.datePosted}</p>
                    {post.dateEdited !== null && <p>Date edited: {post.dateEdited}</p>}
                    <LikeButton token={token} postId={post._id}/>
                    {/* {userId === post.userId && <Link to={{pathname: `/post/${post._id}/edit`}}>Edit Post</Link>} */}
                    {userId === post.userId && <ModifyButton postId={post._id} />}
                    {userId === post.userId && <DeleteButton token={token} postId={post._id} />}
                </div>
            }
        </div>
        </>
    ) 
}