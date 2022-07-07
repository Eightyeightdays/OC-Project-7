import LikeButton from "../buttons/LikeButton"
import EditAndDeleteButton from "../buttons/EditAndDeleteButton";
import { styles } from "../styles"
import { authContext } from "../App";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function Card(props){
    const {auth} = useContext(authContext);
    const userId = auth.userId; // from token created at login
    const token = auth.token;
    const [like, setLike]= useState(props.post.likes);
    const [dislike, setDislike]= useState(props.post.dislikes);

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
            .then(function(response){
               if(response.status === 200){
                setLike(props.post.likes);   // props.post.likes ????
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
            .then(function(response){
               if(response.status === 200){
                setDislike(props.post.dislikes);  
               }
            })
    }

    return(
        <div className="post" style={styles.post}>
            <Link className="postLink" style={styles.postLink} to={{pathname: `/post/${props.post._id}/`}}>
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
            <EditAndDeleteButton userId={userId} token={token} postId={props.post._id} />
        </div>
    )
}