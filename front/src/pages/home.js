import { useEffect, useState, useCallback } from "react";
import Post from "../post.js";
import { Link, Outlet } from "react-router-dom";

export default function Home(){
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
            <div id="header">
                <h1>GROUPOMANIA</h1>
                <button type="submit" name="createPost">Create New Post</button> | {" "}
                <button type="submit">LOGOUT</button>
            </div>
            
            {posts && posts.map((item, index)=>(
                <Link to={`/post/${item._id}`} key={index}>
                    <Post post={item} />
                </Link>
            ))}

            <Outlet />
        </>
    ) 

}