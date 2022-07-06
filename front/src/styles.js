const postLink = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const image ={
    width: "400px",
    height: "400px",
    objectFit: "cover",
    borderRadius: "5%"
}

const post ={
    background: "lightsteelblue",
    margin: "1em",
    color: "white",
    fontSize: "30px",
    padding: "1em",
    borderRadius: "10px",
    width: "max-content",
    
}

const displaySinglePost ={
    margin: "1em",
    padding: "1em",
    color: "white",
    background: "gold",
    fontSize: "30px",
    borderRadius: "10px",
    width: "max-content",
    display: "flex",
    flexDirection: "column"
}

export const styles = {
    post: post,
    displaySinglePost: displaySinglePost,
    image: image,
    postLink: postLink
}

