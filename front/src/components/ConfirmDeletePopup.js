import React, { useState }from "react";

export default function ConfirmDeletePopup(props){
    const [deleteChoice, setDeleteChoice] = useState();

    if(deleteChoice){
        props.handleDelete(props.postId);
    }else{
        
    }

    return(
        <div class="confirmDeletePopup">
                <button id="confirmDeleteButton" type="button" onClick={()=>setDeleteChoice(true)}>Confirm Delete?</button>
                <button id="cancelDeleteButton" type="button" onClick={()=>setDeleteChoice(false)}>Cancel</button>
        </div>
    )

}