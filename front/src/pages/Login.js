import React, { useContext } from "react";
import { authContext } from "../App";
import { useNavigate } from "react-router-dom";


const style = {
        background: "lemonchiffon",
        padding: "1em",
        width: "min-content",
        borderRadius: "10px",
        margin: "2em"
    }

export default function App(){
    
    const {auth, setAuth} = useContext(authContext);
    const navigate = useNavigate();
    
    function handleLogin(){
        const loginForm = document.getElementById("loginForm");
        const user = Object.fromEntries(new FormData(loginForm).entries());
        const settings = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
        };
    
        fetch("http://localhost:3001/auth/login", settings)
        .then(response => response.json())
        .then(data =>{
            if(data.token){
                setAuth({token:data.token, userId: data.userId})  // Add bearer token and userId to state variable
                navigate("/home");
            }
        })
    }

    function handleSignUp(){
        const signUpForm = document.getElementById("signUpForm");
        const user = Object.fromEntries(new FormData(signUpForm).entries());
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
                fetch("http://localhost:3001/auth/login", settings)
                .then(response => response.json())
                .then(data =>{
                    if(data.token){
                        setAuth({token:data.token, userId: data.userId})  // Add bearer token and userId to state variable
                        navigate("/home");
                    }
                })
            }
        })
    }
    
    return(
        <>
            <h1>GROUPOMANIA</h1>
            <div style={style}>
                <h2>LOGIN</h2>
                <form id="loginForm">
                    EMAIL:<input type="text" name="email" />
                    PASSWORD:<input type="password" name="password" />
                </form> 
                <button type="submit" onClick={handleLogin}>LOGIN</button>
            </div>
            <div style={style}>
                <h2>SIGN UP</h2>
                <form id="signUpForm">
                    EMAIL:<input type="text" name="email" />
                    PASSWORD:<input type="password" name="password" />
                </form> 
                <button type="submit" onClick={handleSignUp}>LOGIN</button>
            </div>
        </>
    )
}