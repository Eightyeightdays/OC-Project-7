import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import DeleteButton from "../deleteButton";

import LikeButton from "../likeButton";
import { styles } from "../styles";
 
export default function DisplaySinglePost(){
    const [post, setPost] = useState();
    const params = useParams();
    const placeholder = {userId:"TODO!!!"}  // Get credential details to only show delete/modify buttons on user's own posts
    const userId = "TODO!!!"

    const getSinglePost = useCallback(function(){
         fetch(`http://localhost:3001/posts/${params.postId}`)
        .then(response => response.json()) 
        .then(response => setPost(response)) 
    }, [])
   
    useEffect(() => {
        getSinglePost();
    }, []);
    
       return(
        <div style={styles.displaySinglePost}>
            {post && 
                <div style={styles.post}>
                    <p>User: {post.userId}</p>
                    <p>Title: {post.title}</p>
                    <p>Message: {post.content}</p>
                    <p>Likes: {post.likes}</p>
                    <p>Disikes: {post.dislikes}</p>
                    <LikeButton id={post._id}/>
                    {userId === placeholder.userId && <button type="submit" name="modifyPost">Modify post</button>}
                    {userId === placeholder.userId && <DeleteButton id={post._id} />}
                </div>
            }
        </div>
    ) 
}