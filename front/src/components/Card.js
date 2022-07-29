import React,  { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
import EditAndDeleteButton from "./buttons/EditAndDeleteButton";
import ReactButton from "./buttons/ReactButton";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import handleErrors from "../utils/handleErrors";
import createSettings from "../utils/createSettings";

export default function Card(props){
    let{
        post:  {
            _id: postId,
            userId,
            title,
            content,
            imageUrl,
            reactions,
            dateCreated,
            dateEdited,
        },
        handleDelete
    } = props;

    let clippedContent;
    if(content.length >150){
        clippedContent = content.slice(0, 150)+"...";
    }

    const navigate = useNavigate();
    const params = useParams();
    const [countReactions, setCountReactions]= useState(reactions.length);
    const [toggle, setToggle] = useState(false);
    const [popup, setPopup] = useState(false);
    const currentUser = Cookies.get("userId");
    const admin = Cookies.get("admin"); // is a string, not a boolean

    function handleEdit(){
        let url = `/post/${postId}/edit`;
        navigate(url);
    }

    function reactToPost(type){
        const settings = createSettings("POST", true, JSON.stringify({type: type, userId: Cookies.get("userId")}))
        fetch(`http://localhost:3001/post/${postId}/react`, settings)
        .then(handleErrors)
        .then(function (data) {
            setCountReactions(data.reactionCount);
        })
        .catch(error => console.log(error));
    }

    const confirmDelete = ()=>{
            setPopup(true);
            return;
        }

    useEffect(()=> {
        const timer = setTimeout(()=>{
            setToggle(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [toggle])

        
    function toggleSettings(){
        setToggle(true);      
    }
    
    return(
       <div className="card" >
            <div className="card_header">
                <p className="card_creator-id">Posted by: <strong>{userId}</strong></p>
                <p className="card_date-posted">{dateCreated}{dateEdited && <strong> | Edited: {dateEdited}</strong>}</p>
                <p className="card_title">{title}</p>
                {(currentUser === userId || admin === "true") && 
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
                    <span className="card_likes" >Reactions: <strong>{countReactions}</strong></span>
                </div>
                <div className="reaction_buttons">
                    <ReactButton postId={postId} reactToPost={reactToPost}/>
                </div>
            </div>
            {popup && <ConfirmDeletePopup postId={postId} handleDelete={handleDelete} setPopup={setPopup} />}
        </div>
    )
}
