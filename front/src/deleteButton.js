import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteButton(props){
    const navigate = useNavigate();
    const[post, setPost] = useState();

    const handleDelete = ()=>{
        const settings = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };

        fetch(`http://localhost:3001/posts/${props.id}`, settings)
        .then(response => {
            response.json();
            alert("Post deleted");
            navigate("/home");
            })
        };
        
    return(
      <button type="submit" name="deletePost" onClick={handleDelete}>DELETE POST</button>
    )
}