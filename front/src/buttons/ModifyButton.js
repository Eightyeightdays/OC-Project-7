import { useNavigate } from "react-router-dom";
import React from "react";

export default function ModifyButton(props){
    const {title, content, imageUrl} = props;
    const navigate = useNavigate();
    let url = `/post/${props.postId}/edit`
    
    function handleModify(){
        navigate(url);
    }
    return(
        <button type="submit" name="modifyPost" onClick={handleModify}>EDIT post</button>
    )
}