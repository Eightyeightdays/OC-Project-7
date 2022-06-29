import { useState } from "react";
import LikeButton from "./likeButton";
import { styles } from "./styles";
 
export default function DisplaySinglePost(props){
    const [post, setPost] = useState();

    async function getSinglePost(){
            const id = document.getElementById("userId").value;
            await fetch(`http://localhost:3001/posts/${id}`)
            .then(response => response.json()) 
            .then(response => setPost(response)) 
    };
    
       return(
        <div style={styles.displaySinglePost}>
            ENTER POST ID: <input type="text" name="userId" id="userId" />
            <button type="button" onClick={getSinglePost}>DISPLAY SINGLE POST</button>
            {post && 
                <div style={styles.post}>
                    <p>User: {post.userId}</p>
                    <p>Title: {post.title}</p>
                    <p>Message: {post.content}</p>
                    <p>Likes: {post.likes}</p>
                    <p>Disikes: {post.dislikes}</p>
                    <LikeButton id={post._id}/>
                </div>
            }
        </div>
    ) 
    }