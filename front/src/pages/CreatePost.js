import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleTitle, handleContent } from "../utils/postInputHandlers";
import handleErrors from "../utils/handleErrors";
import handleFileSelect from "../utils/handleFileSelect";
import createSettings from "../utils/createSettings";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function CreatePost(){
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleAlert, setTitleAlert] = useState();
    const [contentAlert, setContentAlert] = useState();
    const [file, setFile] = useState();
    const [src, setSrc] = useState();
    const [fileError, setFileError] = useState();
    
    function handleCreate(event){
        event.preventDefault();

        const form = document.getElementById("postForm");
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        if(title === "" || content === "" || formObject.file ===" "){   // only allow a post with title, content and file to be published
            return;
        }

        const settings = createSettings("POST", false, formData)

        fetch("http://localhost:3001/post", settings)  
        .then(handleErrors)
        .then(response => {
            URL.revokeObjectURL(src);   // Remove preview image URL from memory
            navigate("/home");
        })
        .catch(error => console.log(error));
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
                            <input className="select-file-input" type="file" name="image" onChange={event=>handleFileSelect(event, setFile, setFileError, setSrc)}/>
                            Select file
                        </label>
                    </div>
                <button className="upload-post-button" type="submit" onClick={handleCreate}>Publish</button>
            </form>
            <Navbar nav={true} />
            <div id="error">{fileError}</div>
        </div>
    )
}

