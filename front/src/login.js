import { useState } from "react";

export default function Login(){
    
    const [status, setStatus] = useState("logged out");
    const [user, setUser] = useState();
    
    function sendLogin(){
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
            setStatus("logged in");
            setUser(data.userId);
            }
        })
    }
    
    return(
        <>
            <form id="loginForm">
                EMAIL:<input type="text" name="email" />
                PWORD:<input type="text" name="password" />
             </form> 
            <button type="submit" onClick={sendLogin}>LOGIN</button>
            {status === "logged in" && <p>User: {user} logged in</p>}
        </>
    )
  }