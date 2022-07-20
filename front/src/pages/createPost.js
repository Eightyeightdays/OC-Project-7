import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import extractCookieData from "../utils/extractCookieData";
import { handleTitle, handleContent } from "../utils/postInputHandlers";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function CreatePost(){
    const navigate = useNavigate();
    const cookieData = extractCookieData();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleAlert, setTitleAlert] = useState();
    const [contentAlert, setContentAlert] = useState();
    const [file, setFile] = useState();
    const [src, setSrc] = useState();
    
    function handleCreate(event){
        event.preventDefault();

        const form = document.getElementById("postForm");
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        if(title === "" || content === "" || formObject.file ===" "){
            return;
        }

        URL.revokeObjectURL(src);   // Remove from memory

        const settings = {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Authorization": cookieData.token,
            },
            body: formData,
        };

        fetch("http://localhost:3001/posts", settings)  
        .then(response => {
            response.json()
            if(response.status === 201){
                navigate("/home");
            }else{
                console.log(response)                        // TODO !!!!!
            }
        })
    }
    
    function handleFileSelect(event){
        setFile(event.target.files[0].name);
        let url = URL.createObjectURL(event.target.files[0]);
        setSrc(url);
    }

    return(
        <div className="flex-column">
            <Header />
            <form className="upload-post-form" id="postForm" encType="multipart/form-data">
                    Title<input className="title-input" id="titleInput" type="text" name="title" maxLength="50" onChange={(event)=>handleTitle(setTitle, setTitleAlert, title, event)} value={title} />
                    {<p>{titleAlert}</p>}
                    Content<textarea className="content-input" type="text" name="content" maxLength="1500" onChange={(event)=>handleContent(setContent, setContentAlert, content, event)} value={content} />
                    {<p>{contentAlert}</p>}
                    <div className="upload-image-container">
                        {file && <img className="upload-image" alt="" src={src}></img>}
                        <div className="select-file-description">
                            {file}
                        </div>
                        <label className="select-file-button">
                            <input className="select-file-input" type="file" name="image" onChange={event=>handleFileSelect(event)}/>
                            Select file
                        </label>
                    </div>
                <button className="upload-post-button" type="submit" onClick={handleCreate}>Publish</button>
            </form>
            <Navbar nav={true} />
        </div>
    )
}

