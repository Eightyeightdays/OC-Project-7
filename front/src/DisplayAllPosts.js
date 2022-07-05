import DeleteButton from "./buttons/DeleteButton"
import LikeButton from "./buttons/LikeButton"
import ModifyButton from "./buttons/ModifyButton"
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
            <Link to={{pathname: `/post/${props.post._id}/`}}>
                {Object.keys(props.post).map((key, index)=>{
                    if(key === "dateEdited" && props.post[key] !== null){   // if the post has been edited show the edit date
                        return(
                            <div className="postItem" key={index}>{key}: {props.post[key]}</div>
                        )
                    }else if(key === "imageUrl"){
                        return(
                            <img className="postImage" style={styles.image} src={props.post[key]}></img>
                        )
                    }else if(key !== "_id" && key!== "usersLiked" && key!== "usersDisliked" && key!=="__v" && key!=="dateEdited"){  // only show the relevant fields
                        return( <div className="postItem" key={index}>{key}: {props.post[key]}</div>) 
                    }else{
                        return;
                    }            
                })}
            </Link>
            <LikeButton token={token} postId={props.post._id}/>
            {userId === props.post.userId && <ModifyButton postId={props.post._id} />} 
            {/* {userId === props.post.userId && <Link to={{pathname: `/post/${props.post._id}/edit`}}>Edit Post</Link>} */}
            {userId === props.post.userId && <DeleteButton token={token} postId={props.post._id} />}
        </div>
    )
}