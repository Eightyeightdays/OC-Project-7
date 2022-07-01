import DeleteButton from "./deleteButton"
import LikeButton from "./likeButton"
import { styles } from "./styles"


export default function Post(props){
    const post = {userId:"TODO!!!"}  // Get credential details to only show delete/modify buttons on user's own posts
    const userId = "TODO!!!"

    return(
        <div className="post" style={styles.post}>
            {Object.keys(props.post).map((key, index) =>{
                if(key === "_id"){
                    return (<div id={props.post[key]} key={index}>{key}: {props.post[key]}</div>)   // add the post id to the id tag for delete/modify
                }else{
                   return( <div className="postItem" key={index}>{key}: {props.post[key]}</div>) 
                }
            })}
            <LikeButton id={props.post._id}/>
            {userId === post.userId && <button type="submit" name="modifyPost">Modify post</button>}
            {userId === post.userId && <DeleteButton id={props.post._id} />}
        </div>
    )
}