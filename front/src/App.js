import { Outlet, useNavigate } from "react-router-dom";
import React, { useState, createContext } from "react";

export const authContext = createContext();
const style = {
    background: "lemonchiffon",
    padding: "1em",
    width: "min-content",
    borderRadius: "10px",
    margin: "2em"
}

export default function App(){
    const [credentials, setCredentials] = useState({userId: null, token: null, loggedIn: false});
    const navigate = useNavigate();

    function handleLogin(){
        const form = document.getElementById("loginForm");
        const user = Object.fromEntries(new FormData(form).entries());
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
            // setCredentials({...data, loggedIn: true});  // Add bearer token to state variable
            }
            navigate("/home");
        })
    }
    
    return(
        <>
            <authContext.Provider value={{credentials, setCredentials}}>
                <h1>GROUPOMANIA</h1>
                <div style={style}>
                    <form id="loginForm">
                        EMAIL:<input type="text" name="email" />
                        PASSWORD:<input type="password" name="password" />
                    </form> 
                    <button type="submit" onClick={handleLogin}>LOGIN</button>
                    {/* {credentials.loggedIn && <p>User: {credentials.userId} logged in</p>} */}
                 </div>
                <Outlet />
            </authContext.Provider>
        </>
    )
}