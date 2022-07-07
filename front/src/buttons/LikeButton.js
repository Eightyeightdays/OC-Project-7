import React from "react";

export default function LikeButton(props){
    return(
        <>
            <button type="button" name="like" onClick={()=> props.likePost(props.postId)}>LIKE</button>
            <button type="button" name="dislike" onClick={()=> props.dislikePost(props.postId)}>DISLIKE</button>
        </>
    )
}