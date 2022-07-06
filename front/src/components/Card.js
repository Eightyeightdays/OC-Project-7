import LikeButton from "../buttons/LikeButton"
import EditAndDeleteButton from "../buttons/EditAndDeleteButton";
import { styles } from "../styles"
import { authContext } from "../App";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function Card(props){
    const {auth} = useContext(authContext);
    const userId = auth.userId; // from token created at login
    const token = auth.token;
    const [like, setLike]= useState(props.post.likes);

    const [count, setCount] = useState(0);

    function voteOnPost(choice){
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
                "Authorization" : token,
            },
            body: JSON.stringify(vote)
        };
        fetch(`http://localhost:3001/posts/${props.post._id}/like`, settings)
            .then(function(response){
               if(response.status === 200){
                choice === "like" ? setLike(like +1) : setLike(like -1);
               }
            })
            
    }

    return(
        <div className="post" style={styles.post}>
            <Link className="postLink" style={styles.postLink} to={{pathname: `/post/${props.post._id}/`}}>
                <div className="postItem">{props.post.displayDatePosted}</div>
                <p>{props.post.title}</p>
                <img alt="" className="postImage" style={styles.image} src={props.post.imageUrl}></img>
                <p>{props.post.content}</p>
                <div className="postItem" >Likes: {like}</div>
                <div className="postItem" >Disikes: </div>
            </Link>
            <LikeButton handleClick={event => voteOnPost(event)} token={token} postId={props.post._id}/>
            <EditAndDeleteButton userId={userId} token={token} postId={props.post._id} />
        </div>
    )
}