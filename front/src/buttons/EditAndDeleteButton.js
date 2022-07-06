import { useNavigate } from "react-router-dom";
import React from "react";

export default function EditAndDeleteButton(props){
    const navigate = useNavigate();
    
    function handleEdit(){
        let url = `/post/${props.postId}/edit`;
        navigate(url);
    }

    const handleDelete = ()=>{
        const settings = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": props.token,
            },
            body: JSON.stringify({userId:props.userId})
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
        <>
            <button type="submit" name="modifyPost" onClick={handleEdit}>EDIT post</button>
            <button type="submit" name="deletePost" onClick={handleDelete}>DELETE POST</button>
        </>
    )
}