import React from "react";

export default function EditAndDeleteButton(props){
    return(
        <>
            <button type="button" name="modifyPost" onClick={()=> props.handleEdit(props.postId)}>EDIT post</button>
            <button type="button" name="deletePost" onClick={()=> props.handleDelete(props.postId)}>DELETE POST</button>
        </>
    )
}