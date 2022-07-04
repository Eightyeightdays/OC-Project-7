import React from "react";

import { useNavigate } from "react-router-dom";

export default function ModifyButton(props){
    const navigate = useNavigate();
    
    function handleModify(){
        navigate(`/post/${props.postId}/edit`);
   }
    return(
        <button type="submit" name="modifyPost" onClick={handleModify}>Modify post</button>
    )
}