import LikeButton from "../buttons/LikeButton"
import EditAndDeleteButton from "../buttons/EditAndDeleteButton";
import { styles } from "../styles"
import { Link, useNavigate, useParams } from "react-router-dom";
import { authContext } from "../App";
import React,  { useState, useContext } from "react";

export default function Card(props){
    const{
        post:  {
            _id: postId, 
            userId, 
            title, 
            content, 
            imageUrl,
            likes,
            dislikes,
            comments, 
            usersLiked,     
            usersDisliked, 
            datePosted: timeStamp,
            displayDatePosted: datePosted, 
            displayDateEdited: dateEdited,
        }, 
        handleDelete
    } = props;
    const navigate = useNavigate();
    const {auth} = useContext(authContext);
    const token = auth.token;
    const [like, setLike]= useState({likes: likes, dislikes: dislikes, usersLiked: usersLiked, usersDisliked: usersDisliked});
    const params = useParams();
    
    function updateLikeState(data){
        setLike({likes: data.likes, dislikes: data.dislikes, usersLiked: data.usersLiked, usersDisliked: data.usersDisliked});
        return
    }

    const likePost = ()=>{
        const settings = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : token,
            },
        };
        fetch(`http://localhost:3001/posts/${postId}/like`, settings)
            .then(response => response.json())
            .then(data => updateLikeState(data));
        }

    function dislikePost(){
        const settings = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : token,
            },
        };
        fetch(`http://localhost:3001/posts/${postId}/dislike`, settings)
        .then(response => response.json())
        .then(data => updateLikeState(data));
    }

    function handleEdit(){
        let url = `/post/${postId}/edit`;
        navigate(url);
    }

    function disableButton(id){
        let button = document.getElementById(id);
        button.disabled = true;
        setTimeout(() => {
            button.disabled = false;
          }, 1000)
    }

    return(
        <div className="post" style={styles.post}>
                <p>{userId}</p>
                <div className="postItem">{datePosted}</div>
                <p>{title}</p>
                {params.postId !== postId ? 
                <Link to={`/post/${postId}`}>
                    <img alt="" className="postImage" style={styles.image} src={imageUrl}></img>
                </Link> : 
                <img alt="" className="postImage" style={styles.image} src={imageUrl}></img>}
                <p>{content}</p>
                <div className="postItem" >Likes: {like.likes}</div>
                <div className="postItem" >Disikes: {like.dislikes}</div>
                {dateEdited !== null && <p>Date edited: {dateEdited}</p>}
                <p>Users liked:  {like.usersLiked}</p>
                <p>Users disliked: {like.usersDisliked}</p>
            <LikeButton postId={postId} likePost={likePost} dislikePost={dislikePost} disableButton={disableButton}/>
            {auth.userId === userId || auth.admin === true && <EditAndDeleteButton postId={postId} handleEdit={handleEdit} handleDelete={handleDelete} />}
            {/* { <EditAndDeleteButton postId={postId} handleEdit={handleEdit} handleDelete={handleDelete} />} */}
        </div>
    )
}