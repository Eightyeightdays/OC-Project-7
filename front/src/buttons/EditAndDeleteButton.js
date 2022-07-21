import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

export default function EditAndDeleteButton(props){
    return(
        <> 
            <button type="button" name="deletePost" onClick={()=> props.handleDelete(props.postId)}><FontAwesomeIcon icon={faTrashCan}/></button>
            <button type="button" name="modifyPost" onClick={()=> props.handleEdit(props.postId)}><FontAwesomeIcon icon={faScrewdriverWrench}/></button>
        </>
    )
}