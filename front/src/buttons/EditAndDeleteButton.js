import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

export default function EditAndDeleteButton(props){
    return(
        <> 
            <button type="button" name="deletePost" onClick={()=> props.confirmDelete()}><FontAwesomeIcon icon={faTrashCan}/></button>
            <button type="button" name="modifyPost" onClick={()=> props.handleEdit(props.postId)}><FontAwesomeIcon icon={faPencil}/></button>
        </>
    )
}