import React from "react";

export default function LikeButton(props){
    return(
        <>
            <button id="likeButton" type="button" name="like" onClick={()=> {
                props.likePost('like');
                props.disableButton("likeButton")
            }}>
                LIKE
            </button>
            <button id="dislikeButton" type="button" name="dislike" onClick={()=> {
                props.likePost('dislike');
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
