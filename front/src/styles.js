const postLink = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const image ={
    width: "250px",
    height: "250px",
    objectFit: "cover",
    borderRadius: "2%"
}

const post ={
    background: "lightsteelblue",
    margin: "1em",
    color: "white",
    fontSize: "15px",
    padding: "1em",
    borderRadius: "10px",
    width: "min-content",
    
}

const displaySinglePost ={
    margin: "1em",
    padding: "1em",
    color: "white",
    background: "gold",
    fontSize: "15px",
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

