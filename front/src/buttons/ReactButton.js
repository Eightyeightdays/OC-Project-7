import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp, faThumbsDown, faFaceAngry, faFaceGrinSquintTears, faFaceSadCry, } from '@fortawesome/free-regular-svg-icons';


export default function ReactButton(props){
    return(
        <>
            <FontAwesomeIcon icon={faThumbsUp} className="like-button" type="button" name="like" onClick={event=> {
                props.reactToPost('like');
            }}/>
           
            <FontAwesomeIcon icon={faHeart} className="love-button" type="button" name="love" onClick={event=> {
                props.reactToPost('love');
            }}/>

             <FontAwesomeIcon icon={faFaceGrinSquintTears} className="funny-button" type="button" name="funny" onClick={event=> {
                props.reactToPost('funny');
            }}/>

            <FontAwesomeIcon icon={faThumbsDown} className="dislike-button" type="button" name="dislike" onClick={event=> {
                props.reactToPost('dislike');
            }}/>
           
            <FontAwesomeIcon icon={faFaceAngry} className="hate-button" type="button" name="hate" onClick={event=> {
                props.reactToPost('hate');
            }}/>
           
            <FontAwesomeIcon icon={faFaceSadCry} className="sad-button" type="button" name="sad" onClick={event=> {
                props.reactToPost('sad');
            }}/>
        </>
    )
}
