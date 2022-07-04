import DeleteButton from "./buttons/DeleteButton"
import LikeButton from "./buttons/LikeButton"
// import ModifyButton from "./buttons/ModifyButton"
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
            {Object.keys(props.post).map((key, index) =>{
                if(key === "_id"){
                    return (<div id={props.post[key]} key={index}>{key}: {props.post[key]}</div>)   // add the post id to the id tag for delete/modify
                }else{
                   return( <div className="postItem" key={index}>{key}: {props.post[key]}</div>) 
                }
            })}
            <LikeButton token={token} postId={props.post._id}/>
            {/* {userId === props.post.userId && <ModifyButton postId={props.post._id} />}  */}
            {userId === props.post.userId && <Link to={{pathname: `/post/${props.post._id}/edit`}}>Edit Post</Link>}
            {userId === props.post.userId && <DeleteButton token={token} postId={props.post._id} />}
        </div>
    )
}