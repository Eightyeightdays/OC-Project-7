import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAndSignUp(){
    const [error, setError] = useState();
    const [existingUser, setExistingUser] = useState(true);
    const [buttonLabel, setButtonLabel] = useState("Already have an account?");
    const navigate = useNavigate();
    
    function displayErrorMessage(err){
        setError(err);
        const errorElement = document.getElementById("error");
        errorElement.className="visible";
        setTimeout(()=>{
            errorElement.className = errorElement.className.replace("visible", "")}, 
            5000);
    }

    function handleLogin(){
        const loginForm = document.getElementById("loginForm");
        const user = Object.fromEntries(new FormData(loginForm).entries());
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
                    console.log("ADMIN SIGNED IN");
                }
                navigate("/home"); 
            }else{
                displayErrorMessage("LOGIN DETAILS INCORRECT");
            }
        })
    }

    function handleSignUp(){
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
        let errorMessage ="";

        if(passwordCheck !== true && emailCheck !== true){
            passwordCheck = schema.validate(password, {details: true});
            passwordCheck.forEach(error => errorMessage+= error.message + " - ");
            errorMessage+= " Email format incorrect";
            console.log("PASSWORD & EMAIL ERROR: " + errorMessage);
            displayErrorMessage(errorMessage);
            return;
        }
        else if(passwordCheck !== true){
            passwordCheck = schema.validate(password, {details: true});
            passwordCheck.forEach(error => errorMessage+= error.message + " - ");
            console.log("PASSWORD ERROR: " + errorMessage); 
            displayErrorMessage(errorMessage)
            return;
        }else if(emailCheck !== true){
            errorMessage = "Email format incorrect";
            console.log("EMAIL ERROR: " +errorMessage);
            displayErrorMessage(errorMessage);
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
        if(existingUser !== false){
            setButtonLabel("Sign up");
            setError("");
        }else{
            setButtonLabel("Already have an account?")
            setError("");
        }
    }

    return(
        <>
            <h1>GROUPOMANIA</h1>
            <div className="loginContainer">
                {!existingUser ? 
                <div className="loginAndSignup">
                    <h2>Welcome back!</h2>
                    <form id="loginForm">
                        <input type="text" name="email" placeholder="Email address" />
                        <input type="password" name="password" placeholder="Password" maxLength="15"/>
                    </form> 
                    <button className="loginButton" type="submit" onClick={handleLogin}>LOGIN</button>
                </div> : 
                <div className="loginAndSignup">
                    <h2>Welcome!</h2>
                    <form id="signUpForm">
                        <input type="text" name="email" placeholder="Email address" />
                        <input type="password" name="password" placeholder="Password" maxLength="15"/>
                    </form> 
                    <button className="loginButton" type="submit" onClick={handleSignUp}>SIGN UP AND LOG IN</button>
                </div>}
                <button className="selectButton" type="button" onClick={changeUi}>{buttonLabel}</button> 
                <div id="error">{error}</div>
            </div>
        </>
    )
}