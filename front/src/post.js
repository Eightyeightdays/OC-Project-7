
import LikeButton from "./likeButton"
import { styles } from "./styles"


export default function Post(props){
    const post = {userId:"TODO!!!"}  // Get credential details to only show delete/modify buttons on user's own posts
    const userId = "TODO!!!"

    return(
        <div className="post" style={styles.post}>
            {Object.keys(props.post).map((key, index) =>{
                return(
                <div className="postItem" key={index}>{key}: {props.post[key]}</div>
                )
            })}
            <LikeButton id={props.post._id}/>
            {userId === post.userId && <button type="submit" name="deletePost">Delete post</button>}
            {userId === post.userId && <button type="submit" name="modifyPost">Modify post</button>}
        </div>
    )
}