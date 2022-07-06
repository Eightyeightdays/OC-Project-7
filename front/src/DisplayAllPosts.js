import LikeButton from "./buttons/LikeButton"
import EditAndDeleteButton from "./buttons/EditAndDeleteButton";
import { styles } from "./styles"
import { authContext } from "./App";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

export default function Post(props){
    const {auth} = useContext(authContext);
    const userId = auth.userId; // from token created at login
    const token = auth.token

    return(
        <div className="post" style={styles.post}>
            <Link className="postLink" style={styles.postLink} to={{pathname: `/post/${props.post._id}/`}}>
                {Object.keys(props.post).map((key, index)=>{
                    if(key === "displayDateEdited" && props.post[key] !== null){   // if the post has been edited show the edit date
                        return(
                            <div className="postItem" key={index}>{key}: {props.post[key]}</div>
                        )
                    }else if(key === "imageUrl"){
                        return(
                            <img alt="" key={index} className="postImage" style={styles.image} src={props.post[key]}></img>
                        )
                    }else if(key !== "_id" && key!== "usersLiked" && key!== "usersDisliked" && key!=="__v" && key!=="dateEdited" && key!=="datePosted" && key!== "displayDateEdited"){  // only show the relevant fields
                        return( <div className="postItem" key={index}>{key}: {props.post[key]}</div>) 
                    }else{
                        return;
                    }            
                })}
            </Link>
            <LikeButton token={token} postId={props.post._id}/>
            <EditAndDeleteButton userId={userId} token={token} postId={props.post._id} />
        </div>
    )
}