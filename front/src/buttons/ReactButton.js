import React from "react";

export default function ReactButton(props){
    return(
        <>
            <button id="dislikeButton" className="dislike-button" type="button" name="dislike" onClick={event=> {
                props.reactToPost(event);
                props.disableButton("dislikeButton")
            }}>
                DISLIKE
            </button>
            <button id="likeButton" className="like-button" type="button" name="like" onClick={event=> {
                props.reactToPost(event);
                props.disableButton("likeButton")
            }}>
                LIKE
            </button>
            <button id="hateButton" className="hate-button" type="button" name="hate" onClick={event=> {
                props.reactToPost(event);
                props.disableButton("hateButton")
            }}>
                HATE
            </button>
        </>
    )
}