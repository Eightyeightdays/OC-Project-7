import LikeButton from "../buttons/LikeButton"
import EditAndDeleteButton from "../buttons/EditAndDeleteButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import React,  { useState } from "react";
import extractCookieData from "../utils/extractCookieData";

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
    const cookieData = extractCookieData();

    console.log(cookieData.userId === userId);
    function updateLikeState(data){
        setLike({likes: data.likeCount, dislikes: data.dislikeCount, usersLiked: data.usersLiked, usersDisliked: data.usersDisliked});
    }

    const likePost = (type)=>{
        const settings = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : cookieData.token,
            },
            body: JSON.stringify({
                type: type
            })
        };
        fetch(`http://localhost:3001/posts/${postId}/like`, settings)
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

    if(content.length >150){
        clippedContent = content.slice(0, 150)+"...";
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
            <LikeButton postId={postId} likePost={likePost}  disableButton={disableButton}/>
            {(cookieData.userId === userId || cookieData.admin ) && <EditAndDeleteButton postId={postId} handleEdit={handleEdit} handleDelete={handleDelete} />}
        </div>
    )
}
