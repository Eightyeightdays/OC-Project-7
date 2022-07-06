import React, { useState } from "react";

export default function LikeButton(props){
    return(
        <>
            <button type="button" name="like" onClick={event=> props.handleClick("like")}>LIKE</button>
            <button type="button" name="dislike" onClick={event=> props.handleClick("dislike")}>DISLIKE</button>
        </>
    )
}