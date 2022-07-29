import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import handleErrors from "../utils/handleErrors";
import createSettings from "../utils/createSettings";

export default function DisplaySinglePost(){
    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState();
    
    const settings = createSettings("GET");
  
   useEffect(() => {
       fetch(`http://localhost:3001/post/${params.postId}`, settings)
       .then(handleErrors)
       .then(post => {setPost(post)}) 
       .catch(error => console.log(error))
   }, []);

    const handleDelete = (id)=>{
        const settings = createSettings("DELETE");

        fetch(`http://localhost:3001/post/${id}`, settings)
        .then(handleErrors)
        .then(response => {
            navigate("/home");
            console.log("Post deleted");
            })
        .catch(error => console.log(error))
    };

    return(
        <div className="flex-column">
            <Header />
            {post && <Card post={post} handleDelete={handleDelete}/>}
            <Navbar nav={true} />
        </div>
    )
}