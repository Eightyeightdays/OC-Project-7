export function handleTitle(setTitle, setMessage, title, e){
    setTitle(e.target.value);
    if(title.length >= 50){
        setMessage("Title must be 50 characters or less");                   // TODO - ADD EXTRA STYLING
    }else{
        setMessage("");
    }
}

export function handleContent(setContent, setMessage, content, e){
    setContent(e.target.value);
    if(content.length === 1500){
        setMessage("Post length must be 1500 characters or less");
    }else{
        setMessage("");
    }
}


