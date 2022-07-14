export function handleTitle(set1, set2, title, e){
    set1(e.target.value);
    if(title.length === 49){
        set2("Title must be 50 characters or less");                   // TODO - ADD EXTRA STYLING
    }else{
        set2("");
    }
}

export function handleContent(set1, set2, content, e){
    set1(e.target.value);
    if(content.length === 1499){
        set2("Post length must be 1500 characters or less");
    }else{
        set2("");
    }
}


