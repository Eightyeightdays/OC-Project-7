import { useNavigate } from "react-router-dom";
import React from "react";

export default function DeleteButton(props){
    const navigate = useNavigate();

    const handleDelete = ()=>{
        const settings = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": props.token,
            },
        };

        fetch(`http://localhost:3001/posts/${props.postId}`, settings)
        .then(response => {
            response.json();
            if(response.status === 200){
                navigate("/home");
                alert("Post deleted");
                }
            })
        };
        
    return(
      <button type="submit" name="deletePost" onClick={handleDelete}>DELETE POST</button>
    )
}