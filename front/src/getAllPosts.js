import { useState } from "react";
 
export default function DisplayAllPosts(){
    const [posts, setPosts] = useState();

    async function getAllPosts(){
            await fetch("http://localhost:3001/posts")
            .then(response => response.json()) 
            .then(response => setPosts(response)) 
    };
    
       return(
        <>
            <button type="button" onClick={getAllPosts}>DISPLAY POSTS</button>
            {posts && posts.map((item, index) => <p key={index}>Post ID: {item._id}, Title: {item.title}, Message: {item.content}</p>)}
        </>
    ) 
}