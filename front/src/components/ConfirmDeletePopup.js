import React from "react";

export default function ConfirmDeletePopup(props){
    return(
        <div class="confirmDeletePopup">
                <button id="confirmDeleteButton" type="button" onClick={()=>{props.handleDelete(props.postId); props.setPopup(false)}}>CONFIRM DELETE?</button>
                <button id="cancelDeleteButton" type="button" onClick={()=>props.setPopup(false)}>Cancel</button>
        </div>
    )
}