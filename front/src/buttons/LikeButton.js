import React, { useState } from "react";

export default function LikeButton(props){
    const [like, setLike] = useState();

    function voteOnPost(choice){
        return async function(){    // DO I REALLY NEED THIS???
            let vote;
            if(choice === "like"){
                vote = {vote: "like"};
            }else{
                vote = {vote: "dislike"}
            }
            const settings = {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization" : props.token,
                        },
                        body: JSON.stringify(vote)
                    };
            await fetch(`http://localhost:3001/posts/${props.postId}/like`, settings)
                        .then(response => response.json()) 
                        .then(response => setLike(response))   
            }
    }

    return(
        <>
            <button type="submit" name="like" onClick={voteOnPost("like")}>LIKE</button>
            <button type="submit" name="dislike" onClick={voteOnPost("dislike")}>DISLIKE</button>
        </>
    )
}