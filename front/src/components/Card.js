import LikeButton from "../buttons/LikeButton"
import EditAndDeleteButton from "../buttons/EditAndDeleteButton";
import { styles } from "../styles"
import { authContext } from "../App";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Card(props){
    const {auth} = useContext(authContext);
    const userId = auth.userId; 
    const token = auth.token;
    const [like, setLike]= useState(props.post.likes);
    const [dislike, setDislike]= useState(props.post.dislikes);
    const navigate = useNavigate();

    function likePost(){
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
        fetch(`http://localhost:3001/posts/${props.post._id}/like`, settings)
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

    function dislikePost(){
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
        fetch(`http://localhost:3001/posts/${props.post._id}/dislike`, settings)
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
    
    function handleEdit(){
        let url = `/post/${props.post._id}/edit`;
        navigate(url);
    }

    const handleDelete = ()=>{
        const settings = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({userId})
        };

        fetch(`http://localhost:3001/posts/${props.post._id}`, settings)
        .then(response => {
            response.json();
            if(response.status === 200){
                navigate("/home");
                alert("Post deleted");
                }
            })
        };

    return(
        <div className="post" style={styles.post}>
            <Link className="postLink" style={styles.postLink} to={{pathname: `/post/${props.post._id}/`}}>
                <p>{props.post.userId}</p>
                <div className="postItem">{props.post.displayDatePosted}</div>
                <p>{props.post.title}</p>
                <img alt="" className="postImage" style={styles.image} src={props.post.imageUrl}></img>
                <p>{props.post.content}</p>
                <div className="postItem" >Likes: {like}</div>
                <div className="postItem" >Disikes: {dislike}</div>
                <div>Disliked by: {props.post.usersDisliked}</div>
                <div>Liked by: {props.post.usersLiked}</div>
            </Link>
            <LikeButton likePost={event => likePost(event)} dislikePost={event => dislikePost(event)} token={token} postId={props.post._id}/>
            <EditAndDeleteButton handleEdit={event => handleEdit(event)} handleDelete={event => handleDelete(event)} />
        </div>
    )
}