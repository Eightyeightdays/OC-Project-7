import { useState } from "react";

export default function CreatePost(){
    const [post, setPost] = useState();
    
    async function sendPost(){
        const form = document.getElementById("postForm");
            const postData = Object.fromEntries(new FormData(form).entries());
            
            const settings = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            };

        await fetch("http://localhost:3001/posts", settings)
        .then(response => response.json())
        .then(data => setPost(data));
    }
    
    return(
        <>
            <form id="postForm">
                TITLE<input type="text" name="title" />
                CONTENT<input type="text" name="content" />
            </form>
            <button type="submit" onClick={sendPost}>CREATE POST</button>
        </>
    )
}

