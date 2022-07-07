import React from "react";

export default function EditAndDeleteButton(props){
    return(
        <>
            <button type="submit" name="modifyPost" onClick={()=> props.handleEdit(props.postId)}>EDIT post</button>
            <button type="submit" name="deletePost" onClick={()=> props.handleDelete(props.postId)}>DELETE POST</button>
        </>
    )
}