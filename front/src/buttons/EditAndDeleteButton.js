import React from "react";

export default function EditAndDeleteButton(props){
    return(
        <>
            <button type="submit" name="modifyPost" onClick={props.handleEdit}>EDIT post</button>
            <button type="submit" name="deletePost" onClick={props.handleDelete}>DELETE POST</button>
        </>
    )
}