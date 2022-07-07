import LikeButton from "../buttons/LikeButton"
import EditAndDeleteButton from "../buttons/EditAndDeleteButton";
import { styles } from "../styles"
import React from "react";
import { Link } from "react-router-dom";

export default function Card(props){
    const{
        post: {
            _id: postId, 
            userId, 
            title, 
            content, 
            imageUrl, 
            displayDatePosted: datePosted, 
            displayDateEdited: dateEdited 
        }, 
        like, 
        dislike, 
        likePost, 
        dislikePost, 
        handleEdit, 
        handleDelete
    } = props;

    return(
        <div className="post" style={styles.post}>
            <Link className="postLink" style={styles.postLink} to={{pathname: `/post/${postId}/`}}>
                <p>{userId}</p>
                <div className="postItem">{datePosted}</div>
                <p>{title}</p>
                <img alt="" className="postImage" style={styles.image} src={imageUrl}></img>
                <p>{content}</p>
                <div className="postItem" >Likes: {like}</div>
                <div className="postItem" >Disikes: {dislike}</div>
                {dateEdited !== null && <p>Date edited: {dateEdited}</p>}
            </Link>
            {<LikeButton postId={postId} likePost={likePost} dislikePost={dislikePost} />}
            <EditAndDeleteButton postId={postId} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    )
}