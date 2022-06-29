import GetAllPosts from "./displayAllPosts.js";
import DisplaySinglePost from "./getPostById.js";
import CreatePost from "./createPost.js";
import Login from "./login.js";


function App() {

  return (
    <>
      <h1>GROUPOMANIA</h1>
      <div id="parent"></div>
      <Login />
      <DisplaySinglePost />
      <GetAllPosts />
      <CreatePost />
    </>
  );
}

export default App;
