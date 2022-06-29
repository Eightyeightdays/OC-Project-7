import { useState, useEffect, useCallback } from "react";
import Post from "./post.js";
 
export default function DisplayAllPosts(){
    const [posts, setPosts] = useState();

    const getAllPosts = useCallback(function (count) {
        fetch("http://localhost:3001/posts")
            .then(response => response.json())
            .then(response => setPosts(response))
    }, [])

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return(
        <>            
            {posts && posts.map((item, index)=>
                <Post item={item} key={index} />
            )}
        </>
    ) 
}