import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/icon-left-font-monochrome-black.png";

export default function LoginAndSignUp(){
    const [error, setError] = useState([]);
    const [existingUser, setExistingUser] = useState(false);
    const [buttonLabel, setButtonLabel] = useState("Sign up");
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const navigate = useNavigate();
    
    function displayErrorMessage(array){
        setError(array);
        const errorElement = document.getElementById("error");
        errorElement.className="visible";
        setTimeout(()=>{
            errorElement.className = errorElement.className.replace("visible", "")}, 
            5000);
    }


    function handleLogin(){
        const loginForm = document.getElementById("loginForm");
        const user = Object.fromEntries(new FormData(loginForm).entries());
        let errorMessage =[];

        if(!emailField || !passwordField){
            errorMessage.push("LOGIN DETAILS CANNOT BE EMPTY");
            displayErrorMessage(errorMessage);
            return;
        }

        const settings = {
        method: "POST",
        credentials: "include",
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
        };
    
        fetch("http://localhost:3001/auth/login", settings)
        .then(response => response.json())
        .then(data =>{
            if(data.token){
                if(data.admin){ 
                    navigate("/home");
                }
                navigate("/home"); 
            }else{
                errorMessage.push("LOGIN DETAILS INCORRECT")
                displayErrorMessage(errorMessage);
                return;
            }
        })
    }

    function handleInputs(event){
        const errorElement = document.getElementById("error");
        errorElement.className = errorElement.className.replace("visible", "");
        if(event.target.type === "text"){
            setEmailField(event.target.value);
        }else{
            setPasswordField(event.target.value);
        }
    }

    const checkNewUser = ()=>{
        const signUpForm = document.getElementById("signUpForm");
        const user = Object.fromEntries(new FormData(signUpForm).entries());
        const {email, password} = user;
        const emailValidator = require("email-validator");
        const passwordValidator = require('password-validator');
        const schema = new passwordValidator();
        schema.is().min(8, "Password must contain a minimum of 8 characters");
        schema.is().max(15, "Password must be a maxiumum of 15 characters");
        schema.has().uppercase(2, "Password must contain at least 2 uppercase letters");
        schema.has().symbols(2, "Password must contain at least 2 symbols");
       
        let passwordCheck = schema.validate(password);
        let emailCheck = emailValidator.validate(email); 
        let errorMessage =[];

        if(passwordCheck !== true && emailCheck !== true){
            passwordCheck = schema.validate(password, {details: true});
            passwordCheck.forEach(error => errorMessage.push(error.message));
            errorMessage.push(" Email format incorrect");
            console.log("PASSWORD & EMAIL ERROR: " + errorMessage);
            displayErrorMessage(errorMessage);
            return;
        }else if(passwordCheck !== true){
            passwordCheck = schema.validate(password, {details: true});
            passwordCheck.forEach(error => errorMessage.push(error.message));
            console.log("PASSWORD ERROR: " + errorMessage); 
            displayErrorMessage(errorMessage)
            return;
        }else if(emailCheck !== true){
            errorMessage.push("Email format incorrect");
            console.log("EMAIL ERROR: " +errorMessage);
            displayErrorMessage(errorMessage);
            return;
        }
        return user;
    }

    function handleSignUp(){
        const user = checkNewUser();
        if(user===undefined){
            return;
        }

        const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
        };
    
        fetch("http://localhost:3001/auth/signup", settings)
        .then(response => {
            if(response.status === 201){
                settings.credentials = "include";
                fetch("http://localhost:3001/auth/login", settings)
                .then(response => response.json())
                .then(data =>{
                    if(data.token){
                        navigate("/home");
                    }
                })
            }
        })
    }
    
    function changeUi(){
        setExistingUser(!existingUser);
        setEmailField("");
        setPasswordField("");
        const errorElement = document.getElementById("error");                      ///  make global if possible
        errorElement.className = errorElement.className.replace("visible", "");             
        if(existingUser){
            setButtonLabel("Sign up");
            setError("");
        }else{
            setButtonLabel("Already have an account?")
            setError("");
        }
    }

    return(
        <>
            <div className="loginContainer">
                {!existingUser ? 
                <>
                    <h2>Welcome back!</h2>
                    <form id="loginForm" >
                        <input className="login-input" type="text" name="email" placeholder="Email address" onChange={event=>handleInputs(event)} value={emailField} />
                        <input className="login-input" type="password" name="password" placeholder="Password" maxLength="15" onChange={event=>handleInputs(event)} value={passwordField} />
                    </form> 
                    <button className="loginButton" type="submit" onClick={handleLogin}>LOGIN</button>
                </> 
                :
               <>
                    <h2>Welcome!</h2>
                    <form id="signUpForm">
                        <input className="login-input" type="text" name="email" placeholder="Email address" onChange={event=>handleInputs(event)} value={emailField} />
                        <input className="login-input" type="password" name="password" placeholder="Password" maxLength="15" onChange={event=>handleInputs(event)} value={passwordField} />
                    </form> 
                    <button className="loginButton" type="submit" onClick={handleSignUp}>SIGN UP AND LOG IN</button>
                </>
                }<img className="logo" src={Logo} alt="Groupomania logo"></img>
                <button className="selectButton" type="button" onClick={changeUi}>{buttonLabel}</button> 
                <div id="error">
                    <ul>
                        {error && error.map((err, index)=> <li key={index}>{err}</li>)}
                    </ul>
                </div>
            </div>
            
        </>
    )
}