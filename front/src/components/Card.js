import LikeButton from "../buttons/LikeButton"
import EditAndDeleteButton from "../buttons/EditAndDeleteButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import React,  { useState } from "react";
import extractCookieData from "../utils/extractCookieData";

import ReactButton from "../buttons/ReactButton";

export default function Card(props){
    let{
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
    let clippedContent;
    const navigate = useNavigate();
    const [like, setLike]= useState({likes: likes, dislikes: dislikes, usersLiked: usersLiked, usersDisliked: usersDisliked});
    const params = useParams();
    const cookieData = extractCookieData(document.cookie);

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
                "Authorization" : cookieData.token,
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
                "Authorization" : cookieData.token,
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

    function reactToPost(event){
        let type;
        if(event.target.id === "likeButton"){
            type = "like";
        }else if(event.target.id === "dislikeButton"){
            type = "dislike";
        }else if(event.target.id === "hateButton"){
            type = "hate";
        }else{
            type = "remove";
        }

        const settings = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : cookieData.token,
            },
            body: JSON.stringify({type: type, userId: cookieData.userId}),
        };
        fetch(`http://localhost:3001/posts/${postId}/react`, settings)
        .then(response => response.json())
        .then(data => console.log(data));
    }

    if(content.length >150){
        clippedContent = content.slice(0, 150)+"...";
    }

    return(
        
        <div className="card" >
            <div className="card_header">
                <p className="card_creator-id">Posted by: <strong>{userId}</strong></p>
                <p className="card_date-posted">{datePosted}{dateEdited !== null && <strong> | Edited: {dateEdited}</strong>}</p>
                <p className="card_title">{title}</p>
            </div>
            <div className="image-box">
                {params.postId !== postId ? 
                <Link to={`/post/${postId}`}>
                    <img alt="" className="card_link-image" src={imageUrl}></img>
                </Link> : 
                <img alt="" className="card_image" src={imageUrl}></img>}
            </div>
            {params.postId !== postId ? 
            <p className="card_content">{content.length > 150? clippedContent : content}</p>
            :
            <p className="card_content">{content}</p>}
            <div className="card_details">
                <div className="card_like-container">
                    <span className="card_likes" >Likes: <strong>{like.likes}</strong></span>
                    <span className="card_dislikes" >Disikes: <strong>{like.dislikes}</strong></span>
                </div>
                <div className="button_container">
                    <div className="like_buttons">
                        {/* <LikeButton postId={postId} likePost={likePost} dislikePost={dislikePost} disableButton={disableButton}/> */}
                        <ReactButton postId={postId} reactToPost={reactToPost} disableButton={disableButton}/>
                    </div>
                    <div className="edit_buttons">
                        {(cookieData.userId === userId || cookieData.admin ) && <EditAndDeleteButton postId={postId} handleEdit={handleEdit} handleDelete={handleDelete} />}
                    </div>
                </div>
            </div>
        </div>
    )
}