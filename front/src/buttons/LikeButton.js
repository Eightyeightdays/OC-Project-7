import React from "react";

export default function LikeButton(props){
    return(
        <>
            <button id="dislikeButton" className="dislike-button" type="button" name="dislike" onClick={()=> {
                props.dislikePost(props.postId);
                props.disableButton("dislikeButton")
            }}>
                DISLIKE
            </button>
            <button id="likeButton" className="like-button" type="button" name="like" onClick={()=> {
                props.likePost(props.postId); 
                props.disableButton("likeButton")
            }}>
                LIKE
            </button>
        </>
    )
}