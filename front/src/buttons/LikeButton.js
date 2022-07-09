import React from "react";

export default function LikeButton(props){
    return(
        <>
            <button id="likeButton" type="button" name="like" onClick={()=> {
                props.likePost(props.postId); 
                props.disableButton("likeButton")
            }}>
                LIKE
            </button>
            <button id="dislikeButton" type="button" name="dislike" onClick={()=> {
                props.dislikePost(props.postId);
                props.disableButton("dislikeButton")
            }}>
                DISLIKE
            </button>
        </>
    )
}