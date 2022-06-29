
import LikeButton from "./likeButton"
import { styles } from "./styles"


export default function Post(props){
    return(
        <div className="post" style={styles.post}>
            {Object.keys(props.item).map((key, index) =>{
                return(
                <div className="postItem" key={index}>{key}: {props.item[key]}</div>
                )
            })}
            <LikeButton id={props.item._id}/>
        </div>
    )
}