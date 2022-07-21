import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp, faThumbsDown, faFaceSurprise, faFaceAngry, faFaceGrinSquintTears, faFaceSadCry, } from '@fortawesome/free-regular-svg-icons';


export default function ReactButton(props){
    return(
        <>
            <FontAwesomeIcon icon={faThumbsUp} className="like-button" type="button" name="like" onClick={event=> {
                props.reactToPost('like');
            }}/>
           
            <FontAwesomeIcon icon={faThumbsDown} className="dislike-button" type="button" name="dislike" onClick={event=> {
                props.reactToPost('dislike');
            }}/>
           
            <FontAwesomeIcon icon={faHeart} className="love-button" type="button" name="love" onClick={event=> {
                props.reactToPost('love');
            }}/>
           
            <FontAwesomeIcon icon={faFaceAngry} className="hate-button" type="button" name="hate" onClick={event=> {
                props.reactToPost('hate');
            }}/>
            
            <FontAwesomeIcon icon={faFaceGrinSquintTears} className="funny-button" type="button" name="funny" onClick={event=> {
                props.reactToPost('funny');
            }}/>
           
            <FontAwesomeIcon icon={faFaceSurprise} className="surprised-button" type="button" name="surprised" onClick={event=> {
                props.reactToPost('surprised');
            }}/>
        </>
    )
}
