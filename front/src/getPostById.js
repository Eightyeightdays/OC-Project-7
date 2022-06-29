import { useState } from "react";
 
export default function DisplaySinglePost(data){
    const [post, setPost] = useState();

    async function getSinglePost(){
            const id = document.getElementById("userId").value;

            await fetch(`http://localhost:3001/posts/${id}`)
            .then(response => response.json()) 
            .then(response => setPost(response)) 
    };
    
       return(
        <>
            ENTER USER ID: <input type="text" name="userId" id="userId" />
            <button type="button" onClick={getSinglePost}>DISPLAY SINGLE POST</button>
            {post && 
                <>
                <p>User: {post.userId}</p>
                <p> Message: {post.content}</p>
                </>
            }
        </>
    ) 
    }