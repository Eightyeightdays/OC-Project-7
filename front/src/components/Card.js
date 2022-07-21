import EditAndDeleteButton from "../buttons/EditAndDeleteButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import React,  { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import extractCookieData from "../utils/extractCookieData";

import ReactButton from "../buttons/ReactButton";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

export default function Card(props){
    let{
        post:  {
            _id: postId,
            userId,
            title,
            content,
            imageUrl,
            reactionCount,
            comments,
            dateEdited,
            createdAt,
            updatedAt,
        },
        handleDelete
    } = props;

    let clippedContent;
    if(content.length >150){
        clippedContent = content.slice(0, 150)+"...";
    }

    const navigate = useNavigate();
    const params = useParams();
    const cookieData = extractCookieData(document.cookie);
    const [reactions, setReactions]= useState(reactionCount);
    const [toggle, setToggle] = useState(false);

    function handleEdit(){
        let url = `/post/${postId}/edit`;
        navigate(url);
    }

    function reactToPost(type){
        const settings = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : cookieData.token,
            },
            body: JSON.stringify({type: type, userId: cookieData.userId}),
        };
        fetch(`http://localhost:3001/posts/${postId}/react`, settings)
        .then(response => response.json())
        .then(function (data) {
            setReactions(data.reactionCount);
        });
    }

    var toggleTimeout;
    function toggleSettings(){
        setToggle(true);
        
        toggleTimeout = setTimeout(()=>{
        setToggle(false);
        }, 3000);        
    }

    const [popup, setPopup] = useState(false);
   
    const confirmDelete = ()=>{
        setPopup(true);
        return;
    }


    return(

        <div className="card" >
            <div className="card_header">
                <p className="card_creator-id">Posted by: <strong>{userId}</strong></p>
                <p className="card_date-posted">{createdAt}{dateEdited && <strong> | Edited: {dateEdited}</strong>}</p>
                <p className="card_title">{title}</p>
                {(cookieData.userId === userId || cookieData.admin ) && 
                    <FontAwesomeIcon icon={faBars} className="settingsIcon" onClick={()=> toggleSettings()}/>
                }
                {toggle && 
                    <div className="edit_buttons">
                        <EditAndDeleteButton postId={postId} handleEdit={handleEdit} confirmDelete={confirmDelete} />
                    </div>}
            </div>
            <div className="image-box">
                {params.postId !== postId ?
                <Link to={`/post/${postId}`}>
                    <img alt="" className="card_link-image" src={imageUrl}></img>
                </Link> :
                <img alt="" className="card_image" src={imageUrl}></img>}
            </div>
            {params.postId !== postId ?
            <p className="card_content">{content.length > 150? clippedContent : content}</p>
            :
            <p className="card_content">{content}</p>}
            <div className="card_details">
                <div className="card_like-container">
                    <span className="card_likes" >Reactions: <strong>{reactions}</strong></span>
                </div>
                <div className="reaction_buttons">
                    <ReactButton postId={postId} reactToPost={reactToPost}/>
                </div>
            </div>
            {popup && <ConfirmDeletePopup postId={postId} handleDelete={handleDelete} />}
        </div>
    )
}
