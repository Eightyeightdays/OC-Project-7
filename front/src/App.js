import {useState} from "react";

function App() {
  const [status, setStatus] = useState("logged out");
  const [post, setPost] = useState("");

  function login(e){
    e.preventDefault();
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
        }
      })
  }

  function createPost(e){
    e.preventDefault();
    const form = document.getElementById("postForm");
    const post = Object.fromEntries(new FormData(form).entries());
   
    const settings = {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify(post)
    };

    fetch("http://localhost:3001/posts", settings)
      .then(response => response.json())
      .then(data => setPost(data));
  }

  return (
    <>
      <h1>GROUPOMANIA</h1>
      <div id="parent"></div>
      
      <form id="loginForm">
        EMAIL:<input type="text" name="email" />
        PWORD:<input type="text" name="password" />
      </form> 
      <button type="submit" onClick={login}>LOGIN</button>
      {status === "logged in" && <p>user logged in</p>}
      
      <form id="postForm">
      TITLE<input type="text" name="title" />
      CONTENT<input type="text" name="content" />
      </form>
      <button type="submit" onClick={createPost}>CREATE POST</button>
      {post === true && <p>{post}</p>}
    </>
  );
}

export default App;
