import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAndSignUp(){
    const [loginError, setLoginError] = useState();
    const [signupError, setSignupError] = useState();
    const [existingUser, setExistingUser] = useState();
    const [buttonLabel, setButtonLabel] = useState("Sign up");
    const navigate = useNavigate();
    
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
                setLoginError("LOGIN DETAILS INCORRECT");
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
            setSignupError(errorMessage);
            return;
        }
        else if(passwordCheck !== true){
            passwordCheck = schema.validate(password, {details: true});
            passwordCheck.forEach(error => errorMessage+= error.message + " - ");
            console.log("PASSWORD ERROR: " + errorMessage); 
            setSignupError(errorMessage);
            return;
        }else if(emailCheck !== true){
            errorMessage = "Email format incorrect";
            console.log("EMAIL ERROR: " +errorMessage);
            setSignupError(errorMessage);
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
        if(!existingUser){
            setButtonLabel("Sign up");
        }else{
            setButtonLabel("Already have an account?")
        }
    }

    return(
        <>
            <h1>GROUPOMANIA</h1>
            <div className="loginContainer">
                {!existingUser ? 
                <div className="loginAndSignup">
                    <h2>LOGIN</h2>
                    <form id="loginForm">
                        <input type="text" name="email" placeholder="Email address" />
                        <input type="password" name="password" placeholder="Password" />
                    </form> 
                    <button type="submit" onClick={handleLogin}>LOGIN</button>
                    {loginError && <p>{loginError}</p>}
                </div> : 
                <div className="loginAndSignup">
                    <h2>SIGN UP</h2>
                    <form id="signUpForm">
                        <input type="text" name="email" placeholder="Email address" />
                        <input type="password" name="password" placeholder="Password" />
                    </form> 
                    <button type="submit" onClick={handleSignUp}>SIGN UP AND LOG IN</button>
                    {signupError && <p>{signupError}</p>}
                </div>}
                <button type="button" onClick={changeUi}>{buttonLabel}</button>
            </div>
        </>
    )
}