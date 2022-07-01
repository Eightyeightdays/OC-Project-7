import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost(){
    const [post, setPost] = useState();
    const navigate = useNavigate();
    
    async function handlePost(){
        const form = document.getElementById("postForm");
        const postData = Object.fromEntries(new FormData(form).entries());
        postData.datePosted = Date.now();

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
        .then(data => {
            setPost(data);
            navigate("/home");
        });
    }
    
    return(
        <>
            <form id="postForm">
                TITLE<input type="text" name="title" />
                CONTENT<input type="text" name="content" />
            </form>
            <button type="submit" onClick={handlePost}>CREATE POST</button>
        </>
    )
}

