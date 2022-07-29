export function handleTitle(setTitle, setMessage, title, e){
    setTitle(e.target.value);
    if(e.target.value.length >= 50){
        setMessage("Maximum 50 character limit reached");                  
    }else{
        setMessage("");
    }
}

export function handleContent(setContent, setMessage, content, e){
    setContent(e.target.value);
    if(e.target.value.length === 1500){
        setMessage("Maximum 1500 character limit reached");
    }else{
        setMessage("");
    }
}


