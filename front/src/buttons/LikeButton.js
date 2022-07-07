import React, { useState } from "react";

export default function LikeButton(props){
    return(
        <>
            <button type="button" name="like" onClick={event=> props.likePost()}>LIKE</button>
            <button type="button" name="dislike" onClick={event=> props.dislikePost()}>DISLIKE</button>
        </>
    )
}