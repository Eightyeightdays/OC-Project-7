import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import { handleTitle, handleContent } from "../utils/postInputHandlers";
import handleErrors from "../utils/handleErrors";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function EditPost(){
    const [post, setPost] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [titleAlert, setTitleAlert] = useState();
    const [contentAlert, setContentAlert] = useState();
    const [file, setFile] = useState();
    const navigate = useNavigate();

    const params = useParams();
    const settings = {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : Cookies.get("token"),
        },
    };

    useEffect(()=>{
        fetch(`http://localhost:3001/posts/${params.postId}`, settings)
                .then(handleErrors) 
                .then(data => {
                    setPost(data);
                    setTitle(data.title);           // use data from existing post to fill out form
                    setContent(data.content);
                    let filePath = data.imageUrl;
                    let position = filePath.search(/[0-9]{10}/) + 14;       // get filename from file path
                    let fileName = filePath.slice(position);
                    setFile(fileName);
                })
                .catch(error => console.log(error));
    }, [])
    
    function handleEdit(event){
        event.preventDefault();
        const form = document.getElementById("postForm");
        const formData = new FormData(form);
        formData.append("userId", Cookies.get("userId"));
        const formObject = Object.fromEntries(formData.entries());
        
        if(title === "" || content === "" || formObject.file ===" "){
            return;
        }

        const settings = {
            method: "PUT",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Authorization" : Cookies.get("token"),
            },
            body: formData,
        };
    
        fetch(`http://localhost:3001/posts/${params.postId}`, settings)
            .then(handleErrors) 
            .then(data => {
                setPost(data);
                navigate(`/post/${params.postId}`);
            }) 
            .catch(error => console.log(error));
    }

    function handleFileSelect(event){
        setFile(event.target.files[0].name)     // display selected file name
    }

    return(
        <>
            <Header />
            {post && <>
            <form className="upload-post-form" id="postForm" encType="multipart/form-data">
                    Title<input className="title-input" id="titleInput" type="text" name="title" maxLength="50" onChange={event=>handleTitle(setTitle, setTitleAlert, title, event)} value={title} />
                    {<p>{titleAlert}</p>}
                    Content<textarea className="content-input" type="text" name="content" maxLength="1500" onChange={event=>handleContent(setContent, setContentAlert, content, event)} value={content} />
                    {<p>{contentAlert}</p>}
                    <div className="upload-image-container">
                        <img className="upload-image" alt="" src={post.imageUrl}></img>
                        <div className="select-file-description">
                            {post && file}
                        </div>
                        <label className="select-file-button">
                            <input className="select-file-input" type="file" name="image" onChange={event=>handleFileSelect(event)}/>
                            Select file
                        </label>
                    </div>
                <button className="upload-post-button" type="submit" onClick={handleEdit}>Save changes</button>
            </form>
            <Navbar nav={true} />
            </>}
        </>
    )
}